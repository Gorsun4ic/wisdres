import { genreFormConfig } from "./genre.config";

import FormBuilder from "@features/admin/form-builder/formBuilder";

const GenresForm = ({ mode, id }: { mode: "add" | "edit"; id?: string }) => {
	return <FormBuilder config={genreFormConfig} mode={mode} id={id} />;
};

export default GenresForm;
