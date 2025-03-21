import { PageHeader } from "@/components/core/PageHeader";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/hooks/useAuth";
import { getCredentialByProvider, updateCredentialClientId, updateCredentialClientSecret } from "@/services/CredentialService";
import { Credential } from "@/types/models/Credential";
import { useEffect, useState } from "react";
import { UpdateCredentialClientSecretSchema } from "./dtos/update-credential-secret";
import { UpdateCredentialClientIdSchema } from "./dtos/update-credential-uid";
import { CredentialCreator } from "./ui/credential-creator";
import { CredentialFieldEditor } from "./ui/credential-field-editor";

export function AdminActionsPage() {
  const { user } = useAuth();
  const [credential, setCredential] = useState<Credential | null | undefined>(undefined);

  const fetchCredential = async () => {
    const fetchedCredential = await getCredentialByProvider("42");
    setCredential(fetchedCredential);
  };

  useEffect(() => {
    fetchCredential();
  }, []);

  return (
    <>
      {user && user.is_admin && (
        <div>
          <PageHeader title="Admin actions" description="Actions reserved for administrators" />
          <Separator className="my-4" />
          <h2 className="text-xl font-semibold">API Keys</h2>
          {credential === null && (
            <div className="mt-2 flex flex-col items-start gap-1">
              <p className="text-muted-foreground">No api key has yet been configured for 42.</p>
              <CredentialCreator callback={fetchCredential} />
            </div>
          )}
          {credential && (
            <div className="mt-2 grid gap-1">
              <CredentialFieldEditor
                label="UID"
                placeholder="Enter the UID of your application"
                validationSchema={UpdateCredentialClientIdSchema}
                fieldName="client_id"
                fieldValue={credential.client_id}
                credentialId={credential.id}
                request={updateCredentialClientId}
              />
              <CredentialFieldEditor
                label="SECRET"
                placeholder="Enter the SECRET of your application"
                validationSchema={UpdateCredentialClientSecretSchema}
                fieldName="client_secret"
                fieldValue={credential.client_secret}
                credentialId={credential.id}
                request={updateCredentialClientSecret}
              />
            </div>
          )}
        </div>
      )}
    </>
  );
}
