"use client";
import { FloppyDisk } from "@gravity-ui/icons";
import {
  Button,
  Description,
  FieldError,
  FieldGroup,
  Fieldset,
  Form,
  Input,
  Label,
  TextArea,
  TextField,
} from "@heroui/react";
import { Check } from "@gravity-ui/icons";
import { toast } from "@heroui/react";

const SignUpPage = () => {
  const onSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = {};
    // Convert FormData to plain object
    formData.forEach((value, key) => {
      data[key] = value.toString();
    });
    console.log(data);
    toast.success("Success!", {
      description: "Your account has been created successfully.",
    });
  };
  return (
    <div className="container mx-auto m-10 justify-center min-h-120">
      <div className="flex justify-center">
        <Form className="w-full max-w-120" onSubmit={onSubmit}>
          <Fieldset>
            <Fieldset.Legend className="text-3xl">
              Create New Account
            </Fieldset.Legend>
            <Description className="text-base ">
              Register and explore new Technologies
            </Description>
            <FieldGroup>
              <TextField
                isRequired
                name="name"
                validate={(value) => {
                  if (value.length < 3) {
                    return "Name must be at least 3 characters";
                  }
                  return null;
                }}
              >
                <Label>Name</Label>
                <Input placeholder="Enter you full name" />
                <FieldError />
              </TextField>

              <TextField
                isRequired
                name="email"
                type="email"
                validate={(value) => {
                  if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                    return "Please enter a valid email address";
                  }
                  return null;
                }}
              >
                <Label>Email</Label>
                <Input placeholder="you@example.com" />
                <FieldError />
              </TextField>
              <TextField
                isRequired
                minLength={8}
                name="password"
                type="password"
                validate={(value) => {
                  if (value.length < 8) {
                    return "Password must be at least 8 characters";
                  }
                  if (!/[A-Z]/.test(value)) {
                    return "Password must contain at least one uppercase letter";
                  }
                  if (!/[0-9]/.test(value)) {
                    return "Password must contain at least one number";
                  }
                  return null;
                }}
              >
                <Label>Password</Label>
                <Input placeholder="Enter your password" />
                <Description>
                  Must be at least 8 characters with 1 uppercase and 1 number
                </Description>
                <FieldError />
              </TextField>
            </FieldGroup>
            <Fieldset.Actions>
              <div className="flex gap-2 w-full">
                <Button type="submit" color="success" className="w-full bg-green-800">
                  Sign Up
                </Button>
                <Button type="reset" variant="secondary" className="w-full text-black dark:text-white">
                  Reset
                </Button>
              </div>
            </Fieldset.Actions>
          </Fieldset>
        </Form>
        
      </div>

      
        <div className="flex items-center my-4 mx-auto max-w-md">
        <div className="flex-1 border-t border-gray-300"></div>
        <span className="px-4 text-sm text-gray-500">OR</span>
        <div className="flex-1 border-t border-gray-300"></div>
      </div>

      <div className="mx-auto text-center max-w-lg">
        <Button variant="tertiary" className="w-full" size="lg">
                  Log in with Google 
                </Button>
      </div>
    </div>
  );
};

export default SignUpPage;
