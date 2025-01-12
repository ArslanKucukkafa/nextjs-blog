"use client";
import React from "react";
import { Form, Input, Textarea } from "@nextui-org/react";
import { useAbout } from "../context/AboutContext";

export default function CreateAboutPage() {
  const { state, dispatch } = useAbout();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    dispatch({
      type: "UPDATE_ABOUT_FIELD",
      payload: { [name]: value },
    });
  };

  return (
    <div className="flex flex-col items-center max-w-4xl mx-auto px-4 py-8 gap-8">
      <h1 className="text-2xl font-bold">
        About Bilgilerini {state.about ? "Güncelle" : "Oluştur"}
      </h1>

      <Form className="flex flex-col gap-4 w-full">
        <Input
          className="w-full"
          label="İsim"
          name="name"
          value={state.about?.name || ""}
          onChange={handleChange}
          required
        />
        <Input
          className="w-full"
          label="İş Ünvanı"
          name="jobTitle"
          value={state.about?.jobTitle || ""}
          onChange={handleChange}
          required
        />
        <Input
          className="w-full"
          label="Şirket"
          name="currentCompany"
          value={state.about?.currentCompany || ""}
          onChange={handleChange}
          required
        />
        <Input
          className="w-full"
          label="Konum"
          name="location"
          value={state.about?.location || ""}
          onChange={handleChange}
          required
        />
        <Input
          className="w-full"
          label="Durum"
          name="status"
          value={state.about?.status || ""}
          onChange={handleChange}
          required
        />
        <Input
          className="w-full"
          label="Email"
          name="email"
          type="email"
          value={state.about?.email || ""}
          onChange={handleChange}
          required
        />
        <Textarea
          className="w-full"
          label="Kendinizi Tanıtın"
          name="aboutSelf"
          value={state.about?.aboutSelf || ""}
          onChange={handleChange}
          required
          minRows={4}
          placeholder="Kendinizi tanıtın..."
        />
        <Textarea
          className="w-full"
          label="Hedefleriniz"
          name="goal"
          value={state.about?.goal || ""}
          onChange={handleChange}
          required
          minRows={4}
          placeholder="Hedeflerinizi yazın..."
        />
      </Form>
    </div>
  );
}
