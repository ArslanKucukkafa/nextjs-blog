"use client";
import React, {
  createContext,
  useContext,
  useReducer,
  ReactNode,
  useEffect,
} from "react";
import { aboutApi } from "@/services/aboutApi";
import { About } from "@/services/types";

type AboutState = {
  currentStep: number;
  about: About | null;
  loading: boolean;
  error: string | null;
};

type AboutAction =
  | { type: "SET_ABOUT"; payload: About }
  | { type: "UPDATE_ABOUT_FIELD"; payload: Partial<About> }
  | { type: "NEXT_STEP" }
  | { type: "PREV_STEP" }
  | { type: "SET_STEP"; payload: number }
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_ERROR"; payload: string | null }
  | { type: "RESET" };

const initialAboutState: About = {
  id: "about",
  name: "",
  email: "",
  experinces: [],
  education: [],
  jobTitle: "",
  status: "",
  currentCompany: "",
  goal: "",
  aboutSelf: "",
  skills: [],
  location: "",
};

const initialState: AboutState = {
  currentStep: 1,
  about: initialAboutState,
  loading: false,
  error: null,
};

const aboutReducer = (state: AboutState, action: AboutAction): AboutState => {
  switch (action.type) {
    case "SET_ABOUT":
      return { ...state, about: action.payload };
    case "UPDATE_ABOUT_FIELD":
      if (!state.about) return state;
      return {
        ...state,
        about: {
          ...state.about,
          ...action.payload,
          id: state.about.id,
          experinces: Array.isArray(action.payload.experinces)
            ? action.payload.experinces
            : state.about.experinces,
          education: Array.isArray(action.payload.education)
            ? action.payload.education
            : state.about.education,
          skills: Array.isArray(action.payload.skills)
            ? action.payload.skills
            : state.about.skills,
        },
      };
    case "NEXT_STEP":
      return { ...state, currentStep: Math.min(state.currentStep + 1, 4) };
    case "PREV_STEP":
      return { ...state, currentStep: Math.max(state.currentStep - 1, 1) };
    case "SET_STEP":
      return { ...state, currentStep: action.payload };
    case "SET_LOADING":
      return { ...state, loading: action.payload };
    case "SET_ERROR":
      return { ...state, error: action.payload };
    case "RESET":
      return initialState;
    default:
      return state;
  }
};

const AboutContext = createContext<{
  state: AboutState;
  dispatch: React.Dispatch<AboutAction>;
  saveAbout: () => Promise<void>;
} | null>(null);

export const AboutProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(aboutReducer, initialState);

  useEffect(() => {
    const loadAbout = async () => {
      try {
        dispatch({ type: "SET_LOADING", payload: true });
        const data = await aboutApi.getAbout();
        console.log("Loaded about data:", data);

        const formattedData: About = {
          ...data,
          id: data.id || "about",
          experinces: data.experinces || [],
          education: data.education || [],
          skills: data.skills || [],
          name: data.name || "",
          email: data.email || "",
          jobTitle: data.jobTitle || "",
          status: data.status || "",
          currentCompany: data.currentCompany || "",
          goal: data.goal || "",
          aboutSelf: data.aboutSelf || "",
          location: data.location || "",
        };

        dispatch({ type: "SET_ABOUT", payload: formattedData });
      } catch (error) {
        console.error("Error loading about:", error);
        dispatch({ type: "SET_ERROR", payload: "Failed to load about data" });
      } finally {
        dispatch({ type: "SET_LOADING", payload: false });
      }
    };

    loadAbout();
  }, []);

  useEffect(() => {
    console.log("Current about state:", state.about);
  }, [state.about]);

  const saveAbout = async () => {
    if (!state.about) return;

    try {
      dispatch({ type: "SET_LOADING", payload: true });
      const formattedAbout = {
        ...state.about,
        skills: state.about.skills.map((skill) => ({
          skillName: skill.skillName,
          skillLevel: skill.skillLevel,
          skillDescription: skill.skillDescription,
        })),
      };
      await aboutApi.createOrUpdateAbout(formattedAbout);
      return Promise.resolve();
    } catch (error) {
      dispatch({ type: "SET_ERROR", payload: "Failed to save about data" });
      return Promise.reject(error);
    } finally {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  };

  return (
    <AboutContext.Provider value={{ state, dispatch, saveAbout }}>
      {children}
    </AboutContext.Provider>
  );
};

export const useAbout = () => {
  const context = useContext(AboutContext);
  if (!context) {
    throw new Error("useAbout must be used within an AboutProvider");
  }
  return context;
};
