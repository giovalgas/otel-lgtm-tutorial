package br.dev.giovalgas.worker.config.db;

import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.transaction.annotation.EnableTransactionManagement;

@Configuration
@EnableTransactionManagement
@EnableJpaRepositories(basePackages = "br.dev.giovalgas.worker")
public class DatabaseConfiguration {
}
