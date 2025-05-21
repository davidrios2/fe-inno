// src/components/molecules/FormActions.tsx
import React from 'react';
import Link from "@/components/atoms/Link";
import Button from "@/components/atoms/Button";


export const LoginActions = () => (
    <div className="mt-6 space-y-2">
        <Button
            type="primary"
            size="sm"
            fullWidth={false}
            className="px-12 cursor-pointer"
        >
            Iniciar Sesión
        </Button>
        <Link to="/forgot-password" className="text-sm block cursor-pointer">
            ¿Olvidaste la contraseña?
        </Link>
    </div>
);
