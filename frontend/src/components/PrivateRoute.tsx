import React from "react";
import { Navigate, Route, RouteProps }from "react-router-dom";

interface PrivateRouteProps {
    path: string;
    element: React.ReactNode;
    children?: React.ReactNode;
}

