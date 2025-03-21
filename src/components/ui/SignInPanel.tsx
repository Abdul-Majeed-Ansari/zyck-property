"use client"; // Mark this component as a client component

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userExited, userNotExited, UserType } from "@/redux/reducer/authSlice";
import UserProfilePanel from "./UserProfilePanel";
import { Button } from "./button";
import Link from "next/link";
import { getUserFromDB } from "@/lib/actions/user/getUser";
import { RootState } from "@/redux/store";

const SignInPanel = () => {
    const dispatch = useDispatch();
    const {user,loader}  =  useSelector((state:RootState) => state.auth)
    useEffect(() => {
        const fetchUser = async () => {
            const response = await getUserFromDB();
            if (!response.success || !response.data) {
                dispatch(userNotExited()); // Ensure the state resets if user is not found
                return;
            }

            dispatch(userExited(response.data)); 
        };

        fetchUser();
    }, [dispatch]);

    return (
        <div className="flex gap-3 items-center">
            {user ? (
                <UserProfilePanel user={user} />
            ) : (
                <>
                    <Link href="/auth">
                        <button className="bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-700">
                            Add Property
                        </button>
                    </Link>
                    <Button className="lg:block hidden">
                        <Link href={"/auth"}>Sign Up</Link>
                    </Button>
                </>
            )}
        </div>
    );
};

export default SignInPanel;
