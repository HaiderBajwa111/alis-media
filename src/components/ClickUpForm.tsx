import React from "react";

interface ClickUpFormProps {
  trigger: React.ReactNode;
  title?: string;
}

export default function ClickUpForm({ trigger, title = "Get Started Today" }: ClickUpFormProps) {
  const handleClick = () => {
    window.open(
      "https://forms.clickup.com/90132400098/f/2ky4yhz2-693/AOQ2SERQZ158NDIQVV",
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <div onClick={handleClick}>
      {trigger}
    </div>
  );
}
