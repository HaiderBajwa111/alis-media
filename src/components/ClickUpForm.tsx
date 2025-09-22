import React from "react";

interface ClickUpFormProps {
  trigger: React.ReactNode;
  title?: string;
}

export default function ClickUpForm({ trigger, title = "Get Started Today" }: ClickUpFormProps) {
  const handleClick = () => {
    window.open(
      "https://form.asana.com/?k=nf8sn0NzrM0DO8s3hfSazg&d=1211351713385804",
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
