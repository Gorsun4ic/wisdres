import { publisherFormConfig } from "./publisher.config";

import FormBuilder from "@features/admin/form-builder/formBuilder";


const PublisherForm = ({ mode, id }: { mode: "add" | "edit", id?: string }) => {
	return <FormBuilder config={publisherFormConfig} mode={mode} id={id} />;
};

export default PublisherForm;
