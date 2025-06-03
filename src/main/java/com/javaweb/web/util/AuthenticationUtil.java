package com.javaweb.web.util;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class AuthenticationUtil {
    private boolean authenticated;
}
