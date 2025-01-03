"use client";

import React, { useState } from "react";
import { Form, Input, Button, Textarea } from "@nextui-org/react";

const Contact: React.FC = () => {
  const [contactMessage, setContactMessage] = useState("");

  return (
    <div className="max-w-lg mx-auto mt-8">
      <h2 className="text-4xl font-bold text-center">Contact Form</h2>
      <Form validationBehavior="native">
        <Input
          isRequired
          name="email"
          label="Email"
          labelPlacement="outside"
          placeholder="Enter your email"
          validate={(value) => {
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailPattern.test(value)
              ? null
              : "Please enter a valid email address";
          }}
        />
        <Input
          isRequired
          name="title"
          label="Title"
          labelPlacement="outside"
          placeholder="Enter the title"
        />
        <Input
          isRequired
          name="subject"
          label="Subject"
          labelPlacement="outside"
          placeholder="Enter the subject"
        />
        <Textarea
          isRequired
          label="Message"
          labelPlacement="outside"
          placeholder="Enter your message"
          value={contactMessage}
          onChange={(e) => setContactMessage(e.target.value)}
          className="w-full"
          minRows={4}
        />
        <Button color="primary" variant="shadow">
          Send
        </Button>
      </Form>
    </div>
  );
};

export default Contact;
