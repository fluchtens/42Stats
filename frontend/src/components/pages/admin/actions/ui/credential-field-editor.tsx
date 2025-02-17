import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ApiRes } from "@/services/CoreService";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { MdError } from "react-icons/md";

interface CredentialFieldEditorProps {
  label: string;
  placeholder: string;
  validationSchema: any;
  fieldName: string;
  fieldValue: string;
  credentialId: number;
  request: (id: number, value: string) => Promise<ApiRes>;
}

export const CredentialFieldEditor = ({
  label,
  placeholder,
  validationSchema,
  fieldName,
  fieldValue,
  credentialId,
  request,
}: CredentialFieldEditorProps) => {
  const [edit, setEdit] = useState(false);
  const [value, setValue] = useState<string>(fieldValue);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const form = useForm<typeof validationSchema>({
    resolver: zodResolver(validationSchema),
    defaultValues: { [fieldName]: value },
  });

  const handleCancel = () => {
    setEdit(false);
    setErrorMsg("");
    form.setValue(fieldName, value);
  };

  const onSubmit = async (values: typeof validationSchema) => {
    const fieldValue = values[fieldName];

    if (fieldValue === value) {
      handleCancel();
      return;
    }

    const response = await request(credentialId, fieldValue);
    if (response.success) {
      setSuccess(true);
      setEdit(false);
      setErrorMsg("");
      setValue(fieldValue);
    } else {
      form.setFocus(fieldName);
      setErrorMsg(response.message || "An error occurred.");
    }
  };

  useEffect(() => {
    if (edit) {
      form.setFocus(fieldName);
    }
  }, [edit]);

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => setSuccess(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [success]);

  return (
    <div>
      <div className="flex items-center gap-2">
        <span className={`text-base font-semibold ${errorMsg ? "text-destructive" : ""}`}>{label}</span>
        {success && <span className="text-sm font-medium text-green-500">Saved</span>}
      </div>
      {errorMsg && (
        <div className="flex items-center gap-1">
          <MdError className="hidden sm:block text-destructive" />
          <span className="text-sm font-medium text-destructive">{errorMsg}</span>
        </div>
      )}
      <div className="mt-1 flex justify-between items-center gap-4">
        {edit ? (
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-full flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 sm:gap-2"
            >
              <FormField
                control={form.control}
                name={fieldName}
                render={({ field }) => (
                  <FormItem className="w-full space-y-1">
                    <FormControl>
                      <Input
                        type={fieldName === "email" ? "email" : "text"}
                        placeholder={placeholder}
                        autoComplete="off"
                        required
                        aria-invalid={!!form.formState.errors[fieldName]}
                        className={`sm:max-w-[20rem] ${
                          form.formState.errors[fieldName] || errorMsg ? "border-destructive focus-visible:ring-destructive" : ""
                        }`}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="ml-auto flex items-center gap-2">
                <Button type="button" onClick={handleCancel} variant="ghost">
                  Cancel
                </Button>
                <Button type="submit" variant="default">
                  Save
                </Button>
              </div>
            </form>
          </Form>
        ) : (
          <div className="w-full flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3 sm:gap-2">
            <span className="text-base font-normal text-muted-foreground truncate">{value}</span>
            <Button variant="outline" onClick={() => setEdit(true)} className="ml-auto">
              Edit
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
