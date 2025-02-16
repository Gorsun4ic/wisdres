import { languageFormConfig } from "./languages.config";

import FormBuilder from "@features/admin/form-builder/formBuilder";

const LanguageForm = ({ mode, id }: { mode: "add" | "edit"; id?: string }) => {
	return <FormBuilder config={languageFormConfig} mode={mode} id={id} />;
};

export default LanguageForm;
