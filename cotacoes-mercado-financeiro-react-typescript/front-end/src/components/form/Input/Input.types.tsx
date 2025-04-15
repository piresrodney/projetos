import React from "react";

export interface InputDefault {
  description: string;
  handleOnChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
