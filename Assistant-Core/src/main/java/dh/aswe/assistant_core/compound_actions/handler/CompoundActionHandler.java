package dh.aswe.assistant_core.compound_actions.handler;

import java.io.StringReader;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.List;
import java.util.Properties;

import org.json.JSONArray;
import org.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;

import dh.aswe.assistant_core.AssistantCoreApplication;
import dh.aswe.assistant_core.alarmclock_module.handler.AlarmclockModuleHandler;
import dh.aswe.assistant_core.alarmclock_module.request_body.AlarmBody;
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
import dh.aswe.assistant_core.database.model.Preference;
import dh.aswe.assistant_core.news_module.handler.NewsModuleHandler;
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

    // public ResponseBody postSetupAssistant(final CompoundBody body) {
    //     AlarmBody alarmBody = new AlarmBody(body.getAlarm_time());
    //     Preference preference = new Preference(
    //         this.us
    //     );
    //     String alarmResult = AlarmclockModuleHandler.postSetAlarm(alarmBody);
    //     Preference dbResult = manager.createPreference(preference);
    //     ResponseBody responseBody = new ResponseBody(assembler.toModel(dbResult), alarmResult);
    //     return responseBody;
    // }

    // public ResponseBody getNewsMorning(final Integer id) {
    //     Preference preference = manager.getPreference(id);
    //     List<String> recentNews = new ArrayList<>();
    //     for (String topic : preference.getNewsTopics()) {
    //         String result = NewsModuleHandler.getNews(topic);
    //         log.info("Single thing: " + result);
    //         int start = result.indexOf('[') + 1;
    //         int end = result.indexOf(']');
    //         String cutResult = result.substring(start, end);
    //         log.info("Split string: " + cutResult);
    //         recentNews.add(cutResult);
    //     }
    //     String weather = WeatherModuleHandler.getWeather(preference.getPlace());
    //     String inputString = recentNews.toString();
    //     inputString = inputString
    //             .replaceAll("\n", "")
    //             .replaceAll("\r", "");
    //     Properties props = new Properties();
    //     try {
    //         String propFormat = "key=" + inputString;
    //         props.load(new StringReader(propFormat));
    //     } catch (Exception e) {
    //         e.printStackTrace();
    //     }
    //     String fineString = props.getProperty("key");
    //     String cleanString = URLEncoder.encode(fineString, StandardCharsets.UTF_8);
    //     JSONObject jsonObject = new JSONObject(weather);
    //     double regen = jsonObject.getDouble("regen");
    //     double tempMax = jsonObject.getDouble("tempMax");
    //     double tempMin = jsonObject.getDouble("tempMin");
    //     String formattedString = "Regen chance beträgt " + regen + "%, die höchst Temperatur ist heute " + tempMax
    //             + "°C und die tiefste Temperatur ist " + tempMin + "C.";
    //     TTSBody body = new TTSBody("Hier sind die Titel der neusten Nachrichten"
    //             + fineString
    //             + "Und nun zum Wetter"
    //             + formattedString, "Aria");
    //     Resource audioFile = AssistantTTSModuleHandler.postTextToSoundFilePlay(body);
    //     ResponseBody response = new ResponseBody(audioFile, cleanString);
    //     return response;
    // }

    // public ResponseBody getClassesOfDay(final Integer id) {
    //     Preference preference = manager.getPreference(id);
    //     String classes = RaplaScheduleHandler.getEventsTomorrow();
    //     String[] deadlines = preference.getDeadlines();
    //     JSONArray classesObjects = new JSONArray(classes);
    //     String inputString = "Du hast heute folgende Vorlesungen: ";
    //     for (Object object : classesObjects.toList()) {
    //         if (object instanceof JSONObject) {
    //             JSONObject json = (JSONObject) object;
    //             inputString = inputString + json.getString("Vorlesung") + "von" + json.getString("Start") + "bis"
    //                     + json.getString("Ende") + "und";
    //         }
    //     }
    //     inputString = inputString + "du hast "
    //     for (String deadline : deadlines) {
            
    //     }
    // }
}