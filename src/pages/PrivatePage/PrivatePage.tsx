import React from "react";
import { useReactOidc, withOidcSecure } from "@axa-fr/react-oidc-context";
import { Button } from "@chakra-ui/core";
const PrivatePageNotProtected = () => {
  const { logout, oidcUser } = useReactOidc();
  return (
    <>
      User: {oidcUser.profile.unique_name}
      This protected page <Button onClick={() => logout()}>Logout</Button>
    </>
  );
};

export const PrivatePage = withOidcSecure(PrivatePageNotProtected);
