package dh.aswe.assistant_core;

import org.springframework.boot.SpringApplication;

public class TestAssistantCoreApplication {

	public static void main(String[] args) {
		SpringApplication.from(AssistantCoreApplication::main).with(TestcontainersConfiguration.class).run(args);
	}

}
