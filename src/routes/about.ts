import {createFileRoute} from "@tanstack/react-router";
import AboutPage from "../pages/About.tsx"

export const Route = createFileRoute("/about")({
	component: AboutPage,
});