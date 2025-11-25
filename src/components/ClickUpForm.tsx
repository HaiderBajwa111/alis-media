import React from "react";
import { useNavigate } from "react-router-dom";

interface ClickUpFormProps {
  trigger: React.ReactNode;
  title?: string;
}

export default function ClickUpForm({ trigger, title }: ClickUpFormProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/form');
  };

  return (
    <div onClick={handleClick}>
      {trigger}
    </div>
  );
}
