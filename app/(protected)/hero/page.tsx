"use client";
import React from "react";
import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { heroTextApi } from "@/services/heroTextApi";
import { useRouter } from "next/navigation";

export default function HeroPage() {
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);
  const [heroText, setHeroText] = React.useState({
    id: "hero-text",
    littleText: "",
    heroText: "",
  });

  React.useEffect(() => {
    const fetchHeroText = async () => {
      try {
        setLoading(true);
        const data = await heroTextApi.getHeroText();
        setHeroText(data);
      } catch (error) {
        console.error("Error fetching hero text:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHeroText();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      await heroTextApi.updateHeroText(heroText);
      router.refresh();
    } catch (error) {
      console.error("Error updating hero text:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <Card className="w-full max-w-lg">
        <CardHeader className="flex gap-3">
          <div className="flex flex-col">
            <p className="text-md">Hero Text Management</p>
            <p className="text-small text-default-500">
              Update your homepage hero text
            </p>
          </div>
        </CardHeader>
        <CardBody>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <Input
              label="Little Text"
              placeholder="Enter little text"
              value={heroText.littleText}
              onChange={(e) =>
                setHeroText({ ...heroText, littleText: e.target.value })
              }
            />
            <Input
              label="Hero Text"
              placeholder="Enter hero text"
              value={heroText.heroText}
              onChange={(e) =>
                setHeroText({ ...heroText, heroText: e.target.value })
              }
            />
            <Button
              type="submit"
              color="primary"
              isLoading={loading}
              className="mt-4"
            >
              Save Changes
            </Button>
          </form>
        </CardBody>
      </Card>
    </div>
  );
}
