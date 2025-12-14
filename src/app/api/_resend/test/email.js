import * as React from 'react';
import { Html, Button } from "@react-email/components";

export function Email() {

    return (
        <Html lang="en">
            <Button href={"https://google.com"}>Click me</Button>
        </Html>
    );
}

export default Email;