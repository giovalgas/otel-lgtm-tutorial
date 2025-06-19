package br.dev.giovalgas.api.config.swagger;

import jakarta.servlet.http.HttpServletRequest;
import org.jetbrains.annotations.NotNull;
import org.springdoc.core.properties.SwaggerUiConfigProperties;
import org.springdoc.core.properties.SwaggerUiOAuthProperties;
import org.springdoc.core.providers.ObjectMapperProvider;
import org.springdoc.webmvc.ui.SwaggerIndexPageTransformer;
import org.springdoc.webmvc.ui.SwaggerWelcomeCommon;
import org.springframework.core.io.Resource;
import org.springframework.lang.NonNull;
import org.springframework.web.servlet.resource.ResourceTransformerChain;
import org.springframework.web.servlet.resource.TransformedResource;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.stream.Collectors;

public class SwaggerCustomCssInjector extends SwaggerIndexPageTransformer {
    @NotNull
    public static final String STATIC_SWAGGER_THEME_CSS = "/api/v1/static/swagger-theme.css";

    public SwaggerCustomCssInjector(
            @NotNull final SwaggerUiConfigProperties swaggerUiConfig,
            @NotNull final SwaggerUiOAuthProperties swaggerUiOAuthProperties,
            @NotNull final SwaggerWelcomeCommon swaggerWelcomeCommon,
            @NotNull final ObjectMapperProvider objectMapperProvider) {
        super(swaggerUiConfig, swaggerUiOAuthProperties, swaggerWelcomeCommon, objectMapperProvider);
    }

    @Override
    @NotNull
    public Resource transform(
            @NonNull final HttpServletRequest request,
            @NonNull final Resource resource,
            @NonNull final ResourceTransformerChain transformer) throws IOException {
        if ("index.html".equals(resource.getFilename())) {
            try (InputStream in = resource.getInputStream();
                 BufferedReader reader = new BufferedReader(new InputStreamReader(in))) {
                String html = reader.lines().collect(Collectors.joining(System.lineSeparator()));
                String transformedHtml = injectCss(html);
                return new TransformedResource(resource, transformedHtml.getBytes());
            }
        }
        return super.transform(request, resource, transformer);
    }

    @NotNull
    private String injectCss(@NotNull final String html) {
        return html.replace("</head>", "<link rel=\"stylesheet\" type=\"text/css\" href=\"" + STATIC_SWAGGER_THEME_CSS + "\" /></head>");
    }
}