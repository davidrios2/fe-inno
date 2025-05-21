// src/components/templates/LoginPage.tsx
import React, { useState } from 'react'
import UdeACard          from '@/components/organisms/UdeACard'
import LoginForm         from '@/components/organisms/LoginForm'
import SingupForm         from "@/components/organisms/SingupFrom";

export const LoginPage: React.FC = () => {
    const [showSignup, setShowSignup] = useState(false)

    return (
        <main className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
            <div className="
        bg-white
        rounded-2xl
        shadow-lg
        overflow-hidden
        max-w-4xl w-full
        flex flex-col md:flex-row md:items-stretch
        min-h-[32rem]
      ">
                <UdeACard />

                { showSignup
                    ? <SingupForm onSwitchToLogin={() => setShowSignup(false)} />
                    : <LoginForm  onSwitchToSignup={() => setShowSignup(true)}  />
                }
            </div>
        </main>
    )
}

export default LoginPage