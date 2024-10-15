import { Form } from "./style"

export const FormComponent = ({onSubmit, children}) => <Form onSubmit={onSubmit}>
    {children}
</Form>
