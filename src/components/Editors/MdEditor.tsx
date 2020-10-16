import * as React from "react";
import ReactMde, { Suggestion, SaveImageHandler } from "react-mde";
import * as Showdown from "showdown";
import "react-mde/lib/styles/css/react-mde-all.css";
import MarkDownView from "./MarkdownView";

const loadSuggestions = async (text: string) => {
  return new Promise<Suggestion[]>((accept, reject) => {
    setTimeout(() => {
      const suggestions: Suggestion[] = [
        {
          preview: "Andre",
          value: "@andre",
        },
        {
          preview: "Angela",
          value: "@angela",
        },
        {
          preview: "David",
          value: "@david",
        },
        {
          preview: "Louise",
          value: "@louise",
        },
      ].filter((i) => i.preview.toLowerCase().includes(text.toLowerCase()));
      accept(suggestions);
    }, 250);
  });
};

const converter = new Showdown.Converter({
  tables: true,
  simplifiedAutoLink: true,
  strikethrough: true,
  tasklists: true,
});

interface MdEditor {
  onChange: (value: string) => void;
  initialValue: string;
}

export const MdEditor = ({ onChange, initialValue }: MdEditor) => {
  const [selectedTab, setSelectedTab] = React.useState<"write" | "preview">(
    "write"
  );

  const save: SaveImageHandler = async function* (data: ArrayBuffer) {
    // Promise that waits for "time" milliseconds
    const wait = function (time: number) {
      return new Promise((a, r) => {
        setTimeout(() => a(), time);
      });
    };

    // Upload "data" to your server
    // Use XMLHttpRequest.send to send a FormData object containing
    // "data"
    // Check this question: https://stackoverflow.com/questions/18055422/how-to-receive-php-image-data-over-copy-n-paste-javascript-with-xmlhttprequest

    await wait(2000);
    // yields the URL that should be inserted in the markdown
    yield "https://picsum.photos/300";
    await wait(2000);

    // returns true meaning that the save was successful
    return true;
  };

  return (
    <ReactMde
      initialEditorHeight={400}
      value={initialValue}
      selectedTab={selectedTab}
      onTabChange={setSelectedTab}
      generateMarkdownPreview={(markdown) =>
        Promise.resolve(
          // <Markdown source={markdown} renderers={{ code: CodeBlock }} />
          <MarkDownView source={markdown} />
        )
      }
      // disablePreview
      loadSuggestions={loadSuggestions}
      childProps={{
        writeButton: {
          tabIndex: -1,
        },
      }}
      paste={{
        saveImage: save,
      }}
      onChange={onChange}
    />
  );
};

export default MdEditor;
