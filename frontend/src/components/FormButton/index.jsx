import { FormButton } from "./style"

export const FormButtonComponent = ({type, as, href, children}) => <FormButton type={type} as={as} href={href}>{children}</FormButton>