package dh.aswe.assistant_core.compound_actions.handler;

import java.io.StringReader;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.List;
import java.util.Properties;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.json.JSONArray;
import org.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.hateoas.EntityModel;
import org.springframework.stereotype.Service;

import dh.aswe.assistant_core.AssistantCoreApplication;
import dh.aswe.assistant_core.alarmclock_module.handler.AlarmclockModuleHandler;
import dh.aswe.assistant_core.alarmclock_module.request_body.AlarmBody;
import dh.aswe.assistant_core.assistantstt_module.handler.AssistantSTTModuleHandler;
import dh.aswe.assistant_core.assistantstt_module.request_body.STTBody;
import dh.aswe.assistant_core.assistanttts_module.handler.AssistantTTSModuleHandler;
import dh.aswe.assistant_core.assistanttts_module.request_body.TTSBody;
import dh.aswe.assistant_core.compound_actions.body.CompoundBody;
import dh.aswe.assistant_core.compound_actions.body.ResponseBody;
import dh.aswe.assistant_core.database.assembler.AssistantUserModelAssembler;
import dh.aswe.assistant_core.database.assembler.DeadlineModelAssembler;
import dh.aswe.assistant_core.database.assembler.PreferenceModelAssembler;
import dh.aswe.assistant_core.database.manager.AssistantUserManager;
import dh.aswe.assistant_core.database.manager.DeadlineManager;
import dh.aswe.assistant_core.database.manager.PreferenceManager;
import dh.aswe.assistant_core.database.model.AssistantUser;
import dh.aswe.assistant_core.database.model.Deadline;
import dh.aswe.assistant_core.database.model.Preference;
import dh.aswe.assistant_core.database.model.Preference.Weight;
import dh.aswe.assistant_core.news_module.handler.NewsModuleHandler;
import dh.aswe.assistant_core.openai_module.handler.OpenAIHandler;
import dh.aswe.assistant_core.openai_module.request_body.OpenAIBody;
import dh.aswe.assistant_core.raplaschedule_module.handler.RaplaScheduleHandler;
import dh.aswe.assistant_core.weather_module.handler.WeatherModuleHandler;

@Service
public class CompoundActionHandler {

    private static final Logger log = LoggerFactory.getLogger(AssistantCoreApplication.class);

    @Autowired
    private AssistantUserManager userManager;

    @Autowired
    private AssistantUserModelAssembler userAssembler;

    @Autowired
    private DeadlineManager deadlineManager;

    @Autowired
    private DeadlineModelAssembler deadlineAssembler;

    @Autowired
    private PreferenceManager preferenceManager;

    @Autowired
    private PreferenceModelAssembler preferenceAssembler;

    public ResponseBody postSetupAssistant(final CompoundBody body) {
        AlarmBody alarmBody = new AlarmBody(body.getAlarm_time());
        String alarmResult = AlarmclockModuleHandler.postSetAlarm(alarmBody);
        AssistantUser user = userManager.createAssistantUser(body.getUser());
        List<EntityModel<Preference>> preferences = new ArrayList<>();
        for (Preference preference : body.getPreferences()) {
            preferences.add(preferenceAssembler.toModel(preferenceManager.createPreference(user.getId(), preference)));
        }
        List<EntityModel<Deadline>> deadlines = new ArrayList<>();
        for (Deadline deadline : body.getDeadlines()) {
            deadlines.add(deadlineAssembler.toModel(deadlineManager.createDeadline(user.getId(), deadline)));
        }
        ResponseBody responseBody = new ResponseBody(userAssembler.toModel(user), preferences, deadlines, alarmResult);
        return responseBody;
    }

    public ResponseBody getNewsMorning(final Integer id) {
        AssistantUser user = userManager.getAssistantUser(id);
        List<String> recentNews = new ArrayList<>();
        for (String topic : user.getNewsTopics()) {
            String result = NewsModuleHandler.getNews(topic);
            log.info("Single thing: " + result);
            int start = result.indexOf('[') + 1;
            int end = result.indexOf(']');
            String cutResult = result.substring(start, end);
            log.info("Split string: " + cutResult);
            recentNews.add(cutResult);
        }
        String weather = WeatherModuleHandler.getWeather(user.getPlace());
        String inputString = recentNews.toString();
        inputString = inputString
                .replaceAll("\n", "")
                .replaceAll("\r", "");
        Properties props = new Properties();
        try {
            String propFormat = "key=" + inputString;
            props.load(new StringReader(propFormat));
        } catch (Exception e) {
            e.printStackTrace();
        }
        String fineString = props.getProperty("key");
        String cleanString = URLEncoder.encode(fineString, StandardCharsets.UTF_8);
        JSONObject jsonObject = new JSONObject(weather);
        double regen = jsonObject.getDouble("regen");
        double tempMax = jsonObject.getDouble("tempMax");
        double tempMin = jsonObject.getDouble("tempMin");
        String formattedString = "Regen chance beträgt " + regen + "%, die höchst Temperatur ist heute " + tempMax
                + "°C und die tiefste Temperatur ist " + tempMin + "C.";
        TTSBody body = new TTSBody("Hier sind die Titel der neusten Nachrichten"
                + fineString
                + "Und nun zum Wetter"
                + formattedString, "Aria");
        Resource audioFile = AssistantTTSModuleHandler.postTextToSoundFilePlay(body);
        ResponseBody response = new ResponseBody(cleanString, audioFile);
        return response;
    }

    public ResponseBody getClassesOfDay(final Integer id) {
        List<Deadline> deadlines = deadlineManager.getAllDeadlinesByUserId(id);
        String classes = RaplaScheduleHandler.getEventsTomorrow();
        JSONArray classesObjects = new JSONArray(classes);
        String inputString = "Du hast heute folgende Vorlesungen: ";
        for (Object object : classesObjects.toList()) {
            if (object instanceof JSONObject) {
                JSONObject json = (JSONObject) object;
                inputString = inputString + json.getString("Vorlesung") + "von" + json.getString("Start") + "bis"
                        + json.getString("Ende") + "und";
            }
        }
        inputString = inputString + "du hast folgende Deadlines ";
        for (Deadline deadline : deadlines) {
            inputString = inputString + deadline.getName() + " am " + deadline.getDate() + " und ";
        }
        inputString = inputString.substring(0, inputString.length() - 5);
        inputString = inputString
                .replaceAll("\n", "")
                .replaceAll("\r", "");
        Properties props = new Properties();
        try {
            String propFormat = "key=" + inputString;
            props.load(new StringReader(propFormat));
        } catch (Exception e) {
            e.printStackTrace();
        }
        String fineString = props.getProperty("key");
        TTSBody body = new TTSBody(fineString, "Aria");
        Resource audioFile = AssistantTTSModuleHandler.postTextToSoundFilePlay(body);
        String cleanString = URLEncoder.encode(fineString, StandardCharsets.UTF_8);
        ResponseBody response = new ResponseBody(cleanString, audioFile);
        return response;
    }

    public ResponseBody getActivityofDay(final Integer id) {
        List<Preference> preferences = preferenceManager.getAllPreferencesByUserId(id);
        String inputString = "Hier ist eine Liste von meinen Aktivitäten und ihrer Prioritäten: ";
        for (Preference preference : preferences) {
            inputString = inputString + preference.getName() + " -> " + preference.getPriority();
        }
        OpenAIBody body = new OpenAIBody(inputString);
        OpenAIHandler.postAddMessageToOpenAIHistoryUser(body);
        String prompt = "Wähle EINE Aktivität aus denen die ich dir gegeben habe aus, basierend auf ihrer Priorität, dem aktuellen Wetter und anderen für die Aktivität relevanten Bedingungen";
        body.setPrompt(prompt);
        String answer = OpenAIHandler.postAskOpenAIQuestionWithHistory(body);
        TTSBody bodyTTS = new TTSBody(answer, "Aria");
        Resource audioFile = AssistantTTSModuleHandler.postTextToSoundFilePlay(bodyTTS);
        ResponseBody response = new ResponseBody(answer, audioFile);
        return response;
    }

    public ResponseBody postCRUDCommand(final Resource audioFile, final Integer id) {
        AssistantUser user = userManager.getAssistantUser(id);
        STTBody body = new STTBody(audioFile);
        String createdString = "Erfolgreich erstellt";
        String updatedString = "Erfolgreich aktualisiert";
        String deletedString = "Erfolgreich gelöscht";
        String audioText = AssistantSTTModuleHandler.postSpeechToTextFile(body);
        Pattern pattern = Pattern.compile("(Erstelle|Lese|Aktualisiere|Lösche) (Deadline|Preference)",
                Pattern.MULTILINE | Pattern.CASE_INSENSITIVE);
        Matcher matcher = pattern.matcher(audioText);
        if (matcher.matches()) {
            if (matcher.group(2) == "Deadline") {
                switch (matcher.group(1)) {
                    case "Erstelle":
                        Pattern ePattern = Pattern.compile("(Erstelle) (Deadline) (.*) am (.*)",
                                Pattern.MULTILINE | Pattern.CASE_INSENSITIVE);
                        Matcher eMatcher = ePattern.matcher(audioText);
                        if (eMatcher.matches()) {
                            Deadline dl = new Deadline(eMatcher.group(3), eMatcher.group(4), user);
                            deadlineManager.createDeadline(id, dl);
                            TTSBody bodyTTS = new TTSBody(createdString, "Aria");
                            Resource file = AssistantTTSModuleHandler.postTextToSoundFilePlay(bodyTTS);
                            ResponseBody response = new ResponseBody(createdString, file);
                            return response;
                        }
                        break;
                    case "Lese":
                        Pattern lPattern = Pattern.compile("(Lese) (Deadline)",
                                Pattern.MULTILINE | Pattern.CASE_INSENSITIVE);
                        Matcher lMatcher = lPattern.matcher(audioText);
                        if (lMatcher.matches()) {
                            List<Deadline> deadlines = deadlineManager.getAllDeadlinesByUserId(id);
                            String text = "Hier deine Deadlines: ";
                            for (Deadline deadline : deadlines) {
                                text = text + deadline.getName();
                            }
                            TTSBody bodyTTS = new TTSBody(text, "Aria");
                            Resource file = AssistantTTSModuleHandler.postTextToSoundFilePlay(bodyTTS);
                            ResponseBody response = new ResponseBody(text, file);
                            return response;
                        }
                        break;
                    case "Aktualisiere":
                        Pattern aPattern = Pattern.compile("(Aktualisiere) ([0-9]*) (Deadline) (.*) am (.*)",
                                Pattern.MULTILINE | Pattern.CASE_INSENSITIVE);
                        Matcher aMatcher = aPattern.matcher(audioText);
                        if (aMatcher.matches()) {
                            Deadline dl = new Deadline(aMatcher.group(4), aMatcher.group(5), user);
                            deadlineManager.updateDeadline(dl, Integer.parseInt(aMatcher.group(2)));
                            TTSBody bodyTTS = new TTSBody(updatedString, "Aria");
                            Resource file = AssistantTTSModuleHandler.postTextToSoundFilePlay(bodyTTS);
                            ResponseBody response = new ResponseBody(updatedString, file);
                            return response;
                        }
                        break;
                    case "Lösche":
                        Pattern dPattern = Pattern.compile("(Lösche) ([0-9]*) (Deadline)",
                                Pattern.MULTILINE | Pattern.CASE_INSENSITIVE);
                        Matcher dMatcher = dPattern.matcher(audioText);
                        if (dMatcher.matches()) {
                            deadlineManager.deleteDeadline(Integer.parseInt(dMatcher.group(2)));
                            TTSBody bodyTTS = new TTSBody(deletedString, "Aria");
                            Resource file = AssistantTTSModuleHandler.postTextToSoundFilePlay(bodyTTS);
                            ResponseBody response = new ResponseBody(deletedString, file);
                            return response;
                        }
                        break;
                    default:
                        return null;
                }
            } else {
                switch (matcher.group(1)) {
                    case "Erstelle":
                        Pattern ePattern = Pattern.compile("(Erstelle) (Preference) (.*) priorität (.*)",
                                Pattern.MULTILINE | Pattern.CASE_INSENSITIVE);
                        Matcher eMatcher = ePattern.matcher(audioText);
                        if (eMatcher.matches()) {
                            Weight prio = Weight.LOW;
                            switch (eMatcher.group(4)) {
                                case "low":
                                    prio = Weight.LOW;
                                    break;
                                case "medium":
                                    prio = Weight.MEDIUM;
                                    break;
                                case "high":
                                    prio = Weight.HIGH;
                                    break;
                                default:
                                    break;
                            }
                            Preference pref = new Preference(prio, eMatcher.group(3), user);
                            preferenceManager.createPreference(id, pref);
                            TTSBody bodyTTS = new TTSBody(createdString, "Aria");
                            Resource file = AssistantTTSModuleHandler.postTextToSoundFilePlay(bodyTTS);
                            ResponseBody response = new ResponseBody(createdString, file);
                            return response;
                        }
                        break;
                    case "Lese":
                        Pattern lPattern = Pattern.compile("(Lese) (Preference)",
                                Pattern.MULTILINE | Pattern.CASE_INSENSITIVE);
                        Matcher lMatcher = lPattern.matcher(audioText);
                        if (lMatcher.matches()) {
                            List<Preference> preferences = preferenceManager.getAllPreferencesByUserId(id);
                            String text = "Hier deine Preferences: ";
                            for (Preference preference : preferences) {
                                text = text + preference.getName();
                            }
                            TTSBody bodyTTS = new TTSBody(text, "Aria");
                            Resource file = AssistantTTSModuleHandler.postTextToSoundFilePlay(bodyTTS);
                            ResponseBody response = new ResponseBody(text, file);
                            return response;
                        }
                        break;
                    case "Aktualisiere":
                        Pattern aPattern = Pattern.compile("(Aktualisiere) ([0-9]*) (Preference) (.*) am (.*)",
                                Pattern.MULTILINE | Pattern.CASE_INSENSITIVE);
                        Matcher aMatcher = aPattern.matcher(audioText);
                        if (aMatcher.matches()) {
                            Weight prio = Weight.LOW;
                            switch (aMatcher.group(4)) {
                                case "low":
                                    prio = Weight.LOW;
                                    break;
                                case "medium":
                                    prio = Weight.MEDIUM;
                                    break;
                                case "high":
                                    prio = Weight.HIGH;
                                    break;
                                default:
                                    break;
                            }
                            Preference pref = new Preference(prio, aMatcher.group(3), user);
                            preferenceManager.updatePreference(pref, Integer.parseInt(aMatcher.group(2)));
                            TTSBody bodyTTS = new TTSBody(updatedString, "Aria");
                            Resource file = AssistantTTSModuleHandler.postTextToSoundFilePlay(bodyTTS);
                            ResponseBody response = new ResponseBody(updatedString, file);
                            return response;
                        }
                        break;
                    case "Lösche":
                        Pattern dPattern = Pattern.compile("(Lösche) ([0-9]*) (Preference)",
                                Pattern.MULTILINE | Pattern.CASE_INSENSITIVE);
                        Matcher dMatcher = dPattern.matcher(audioText);
                        if (dMatcher.matches()) {
                            preferenceManager.deletePreference(Integer.parseInt(dMatcher.group(2)));
                            TTSBody bodyTTS = new TTSBody(deletedString, "Aria");
                            Resource file = AssistantTTSModuleHandler.postTextToSoundFilePlay(bodyTTS);
                            ResponseBody response = new ResponseBody(deletedString, file);
                            return response;
                        }
                        break;
                    default:
                        return null;
                }
            }
        }
        return null;
    }

    public ResponseBody askGod(final Resource audioFile, final Integer id) {
        List<Preference> preferences = preferenceManager.getAllPreferencesByUserId(id);
        List<Deadline> deadlines = deadlineManager.getAllDeadlinesByUserId(id);
        String text = "Hier Kontext: " + preferences.toString() + " und " + deadlines.toString();
        OpenAIBody body = new OpenAIBody(text);
        OpenAIHandler.postAddMessageToOpenAIHistoryUser(body);
        STTBody bodySTT = new STTBody(audioFile);
        String prompt = AssistantSTTModuleHandler.postSpeechToTextFile(bodySTT);
        body.setPrompt(prompt);
        String answer = OpenAIHandler.postAskOpenAIQuestionWithHistory(body);
        TTSBody bodyTTS = new TTSBody(answer, "Aria");
        Resource file = AssistantTTSModuleHandler.postTextToSoundFilePlay(bodyTTS);
        ResponseBody response = new ResponseBody(answer, file);
        return response;
    }
}