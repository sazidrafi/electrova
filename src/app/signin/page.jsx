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
import { FaGoogle } from "react-icons/fa";
import Link from "next/link";
import { signIn } from "../lib/auth-client";
import { useRouter } from "next/navigation";

const SignInPage = () => {
  const router = useRouter();
  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const { email, password } = Object.fromEntries(formData.entries());

    try {
      const { data, error } = await signIn.email({
        email,
        password,
      });
      if (error) {
        toast.danger("Signin Failed!", {
          description: error.message,
        });
        return;
      }

      // console.log("Signin data:", data);

      toast.success("Success!", {
        description: `Welcome Back`,
      });
      router.push("/");
    } catch (error) {
      toast.danger("Something went wrong!", {
        description: error.message || "Please try again.",
      });
    }
  };
  return (
    <div className="container mx-auto m-10 min-h-120">
      <div className="bg-gray-200 dark:bg-gray-800 rounded-2xl max-w-full p-6">
        <div className="flex justify-center">
          <Form className="w-full max-w-120" onSubmit={onSubmit}>
            <Fieldset>
              <Fieldset.Legend className="text-3xl text-center m-5">
                Welcome Back
              </Fieldset.Legend>
              <Description className="text-base ">
                Sign in to continue to your account
              </Description>
              <FieldGroup>
                <TextField
                  isRequired
                  name="email"
                  type="email"
                  validate={(value) => {
                    if (
                      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)
                    ) {
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
                >
                  <Label>Password</Label>
                  <Input placeholder="Enter your password" />
                  <FieldError />
                </TextField>
                <div className="flex gap-1">
                  <p>Don&apos;t have an account ?</p>
                  <Link href="/signup" className="text-blue-400 font-semibold">
                    Sign Up
                  </Link>
                </div>
              </FieldGroup>
              <Fieldset.Actions>
                <div className="flex gap-2 w-full">
                  <Button
                    type="submit"
                    color="success"
                    className="w-full bg-green-800"
                  >
                    Sign In
                  </Button>
                  <Button
                    type="reset"
                    variant="secondary"
                    className="w-full text-black dark:text-white"
                  >
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
            Log in with Google <FaGoogle />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
