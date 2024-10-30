package dh.aswe.assistant_module;

import org.springframework.boot.SpringApplication;

public class TestAssistantModuleApplication {

	public static void main(String[] args) {
		SpringApplication.from(AssistantModuleApplication::main).with(TestcontainersConfiguration.class).run(args);
	}

}
