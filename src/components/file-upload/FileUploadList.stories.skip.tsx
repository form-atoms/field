import { FieldAtom, fieldAtom, useFieldValue } from "form-atoms";

import { FileUpload } from "./FileUpload";
import { SwitchUploadAtom } from "./SwitchUploadAtom";
import { uploadAtom } from "../../atoms";
import { StringField, listField, stringField } from "../../fields";
import { PicoFieldErrors } from "../../scenarios/PicoFieldErrors";
import { meta } from "../../scenarios/StoryForm";

import { listStory, render } from "../../fields/list-field/listField.stories";

export default {
  ...meta,
  title: "components/FileUpload",
  render,
};

let id = 3;

const fakeUploadAtom = uploadAtom(
  () =>
    new Promise<string>((resolve, reject) => {
      setTimeout(() => {
        if (Math.random() > 0.3) {
          resolve(`https://picsum.photos/id/${id++}/100/100`);
        } else {
          reject("Simulated error message as passed to Promise.reject().");
        }
      }, 2000);
    }),
);

const fileList = listField({
  value: [
    {
      id: "1",
      url: "https://picsum.photos/id/1/100/100",
    },
    {
      id: "2",
      url: "https://picsum.photos/id/2/100/100",
    },
  ],
  fields: () => ({
    // the ID must be optional, to permit submit newly uploaded files to the server
    id: stringField().optional(),
    // the URL is only a fieldAtom, not zodField, as the uploadAtom extends only the fieldAtom
    url: fieldAtom({ value: "" }),
  }),
});

const Image = ({ url }: { url: FieldAtom<string> }) => {
  const value = useFieldValue(url);

  return (
    <img width={100} height={100} style={{ marginRight: 20 }} src={value} />
  );
};

const IdMessage = ({ id }: { id: StringField }) => {
  const value = useFieldValue(id);

  return value ? (
    <span>
      I'm already stored with <strong>id: {value}</strong>
    </span>
  ) : (
    <span>New url ready to be stored in DB (after form submit).</span>
  );
};

export const FileUploadList = listStory({
  parameters: {
    docs: {
      description: {
        story:
          "Here we use custom `uploadAtom()` which handles `File` upload from the client side. The form will eventually be submitted with the uploaded URL.",
      },
    },
  },
  args: {
    atom: fileList,
    children: ({ List }) => (
      <List>
        <List.Item>
          {({ fields, remove }) => {
            return (
              <div
                style={{
                  display: "grid",
                  gridGap: 16,
                  gridTemplateColumns: "auto min-content",
                }}
              >
                <SwitchUploadAtom field={fields.url}>
                  {({ isUpload, field }) => {
                    return isUpload ? (
                      <FileUpload field={field}>
                        {({ isLoading, isSuccess, isError }) => (
                          <div>
                            {isLoading ? (
                              <>
                                <p>
                                  Please wait... <progress />
                                </p>
                              </>
                            ) : isSuccess ? (
                              <p>
                                <Image url={fields.url} />
                                <ins>Done. </ins>
                                <IdMessage id={fields.id} />
                              </p>
                            ) : isError ? (
                              <>
                                <p>
                                  Failed to upload. Use the{" "}
                                  <code>FieldErrors</code> component to display
                                  the reason thrown from your{" "}
                                  <code>upload</code> action:
                                  <PicoFieldErrors field={fields.url} />
                                </p>
                              </>
                            ) : (
                              <></>
                            )}
                          </div>
                        )}
                      </FileUpload>
                    ) : (
                      <p>
                        <Image url={fields.url} />
                        <IdMessage id={fields.id} />
                      </p>
                    );
                  }}
                </SwitchUploadAtom>
                <div>
                  <button
                    type="button"
                    className="outline secondary"
                    onClick={remove}
                  >
                    Remove
                  </button>
                </div>
              </div>
            );
          }}
        </List.Item>
        <List.Add>
          {({ add }) => (
            <input
              type="file"
              multiple
              onChange={(event) => {
                const files = Array.from(event.currentTarget.files ?? []);

                files.forEach((file) =>
                  add({
                    id: "",
                    // @ts-expect-error uploadAtom value needs to branch to file/result
                    url: fakeUploadAtom(file),
                  }),
                );
              }}
            />
          )}
        </List.Add>
      </List>
    ),
  },
});
