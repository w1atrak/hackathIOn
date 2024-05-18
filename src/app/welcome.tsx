import React, {useState, useCallback, Component} from "react";
import { useNavigate } from "react-router-dom";
import Introduction from "~/app/Introduction";

export default function WelcomePage() {
    
    return (
        <div className="relative flex items-center justify-center h-screen flex-col">
            <Introduction></Introduction>
        </div>
    );
}