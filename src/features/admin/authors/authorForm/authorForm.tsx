import { authorFormConfig } from "./author.config";

import FormBuilder from "@features/admin/form-builder/formBuilder";

const AuthorForm = ({ mode, id }: { mode: "add" | "edit"; id?: string }) => {
	return <FormBuilder config={authorFormConfig} mode={mode} id={id} />;
};

export default AuthorForm;
