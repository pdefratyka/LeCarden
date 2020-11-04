package com.router.utils.security;

import com.router.config.EnvironmentService;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Component
public class JwtTokenAuthenticationFilter extends OncePerRequestFilter {

    @Autowired
    private EnvironmentService environmentService;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response,
                                    FilterChain chain) throws ServletException, IOException {
        String header = request.getHeader("Authorization");

        if (header == null || !header.startsWith("Bearer")) {
            chain.doFilter(request, response);
            return;
        }
        String token = header.replace("Bearer", "");
        try {
            Claims claims = Jwts.parser()
                    .setSigningKey(environmentService.getTokenSecretKey())
                    .parseClaimsJws(token)
                    .getBody();

            String username = claims.getSubject();
            String userIdFromClaim = String.valueOf(claims.get("userId"));
            String userId = getUserIdFromPath(request.getServletPath());
            if (username != null && (userId.equals("") || userIdFromClaim.equals(userId))) {
                UsernamePasswordAuthenticationToken auth = new UsernamePasswordAuthenticationToken(
                        username, null, null);
                SecurityContextHolder.getContext().setAuthentication(auth);
            }

        } catch (Exception e) {
            SecurityContextHolder.clearContext();
        }
        chain.doFilter(request, response);
    }

    private String getUserIdFromPath(String path) {
        String[] userIdFromPath = path.split("user-id/");
        if (userIdFromPath.length > 1) {
            return userIdFromPath[1].split("/")[0];
        }
        return "";
    }
}