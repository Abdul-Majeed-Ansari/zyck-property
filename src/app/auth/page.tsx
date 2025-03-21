'use client'
import React, { useEffect, useState } from "react";
import styles from "../page.module.css";
import { RegisterLink, LoginLink } from "@kinde-oss/kinde-auth-nextjs/components";
import EmailInput from "../../components/Email"; // Adjust the path as needed
import { FaFacebook, FaGoogle } from "react-icons/fa"; // Make sure to install react-icons if not already
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useRouter } from 'next/navigation';

const AuthPage: React.FC = () => {
    const { user,loader } = useSelector((state: RootState) => state.auth);
    const router = useRouter();

    useEffect(() => {
        if (user) {
            // If user is logged in, redirect to homepage
            router.push('/');
        } 
    }, [user, router]);

    return (
        <div
            className="flex items-center justify-center min-h-screen bg-cover bg-center"
            style={{ backgroundImage: 'url(/bglogin.jpg)' }}
        >
            <div className="bg-white rounded-lg shadow-md p-8 max-w-md w-full">
                <h1 className="text-2xl font-bold text-center mb-4 text-green-700">Log In</h1>
                <p className="text-sm text-center mb-6 text-gray-500">Login here using Email and password</p>

                <div className="space-y-4">
                    <EmailInput />
                    <div className={styles.authMethods}>
                        <LoginLink
                            className={styles.googleButton}
                            authUrlParams={{
                                connection_id: process.env.NEXT_PUBLIC_KINDE_CONNECTION_GOOGLE!
                            }}
                        >
                            <FaGoogle className={styles.googleIcon} />
                            Sign in with Google
                        </LoginLink>
                        <LoginLink
                            className={styles.googleButton}
                            authUrlParams={{
                                connection_id: process.env.NEXT_PUBLIC_KINDE_CONNECTION_FACEBOOK!
                            }}
                        >
                            <FaFacebook className={styles.googleIcon} />
                            Sign in with Facebook
                        </LoginLink>
                    </div>
                    <div className={styles.footer}>
                        <span className="flex flex-col justify-center items-center">
                            <p className="text-black">Don&apos;t have an account? </p>
                            <RegisterLink className="btn btn-dark">Create account</RegisterLink>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuthPage;
