"use client";

import React, { useState } from "react";
import { Form, Input, Button, Textarea } from "@nextui-org/react";
import { contactApi } from "@/services/contactApi";
import axios from "axios";

const Contact: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [action, setAction] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setStatus("idle");
    setErrorMessage("");

    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const data = Object.fromEntries(formData);

    try {
      await contactApi.sendEmail({
        to: data.email as string,
        subject: data.subject as string,
        body: data.message as string,
      });
      setStatus("success");
      setAction(`Message sent successfully!`);
      (e.target as HTMLFormElement).reset();
    } catch (error: unknown) {
      setStatus("error");
      if (axios.isAxiosError(error)) {
        if (error.response?.data?.message) {
          setErrorMessage(error.response.data.message);
        } else if (error.message) {
          setErrorMessage(error.message);
        }
      } else {
        setErrorMessage("Failed to send message. Please try again.");
      }
      console.error("Contact form error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-8 p-4">
      <h2 className="text-4xl font-bold text-center mb-8">Contact Me</h2>
      <Form
        className="flex flex-col gap-8"
        validationBehavior="native"
        onSubmit={handleSubmit}
        onReset={() => {
          setAction("Form reset");
          setStatus("idle");
          setErrorMessage("");
        }}
      >
        <Input
          isRequired
          type="email"
          label="Email"
          labelPlacement="outside"
          name="email"
          placeholder="Enter your email"
          errorMessage="Please enter a valid email address"
        />

        <Input
          isRequired
          label="Subject"
          labelPlacement="outside"
          name="subject"
          placeholder="Enter subject"
          errorMessage="Please enter a subject"
        />

        <Textarea
          isRequired
          label="Message"
          labelPlacement="outside"
          name="message"
          placeholder="Enter your message"
          minRows={4}
          errorMessage="Please enter a message"
        />

        <div className="flex gap-4 justify-center">
          <Button
            color="primary"
            isLoading={isLoading}
            type="submit"
            variant="bordered"
          >
            Send Message
          </Button>
          <Button color="danger" type="reset" variant="bordered">
            Reset
          </Button>
        </div>

        {action && (
          <div className="text-small text-success text-center">{action}</div>
        )}

        {status === "error" && (
          <div className="text-small text-danger text-center">
            {errorMessage}
          </div>
        )}
      </Form>
    </div>
  );
};

export default Contact;
