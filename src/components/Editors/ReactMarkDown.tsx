import * as React from "react";
import ReactMde, { Suggestion, SaveImageHandler } from "react-mde";
import * as Showdown from "showdown";
import "react-mde/lib/styles/css/react-mde-all.css";

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

interface ReactMarkDown {
  onChange: (value: string) => void;
  initialValue: string;
}

// { onChange, initialValue }: ReactMarkDown
export const ReactMarkDown = ({ onChange, initialValue }: ReactMarkDown) => {
  // const [value, setValue] = React.useState(initialValue);
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
      initialEditorHeight={600}
      maxEditorHeight={600}
      value={initialValue}
      selectedTab={selectedTab}
      onTabChange={setSelectedTab}
      generateMarkdownPreview={(markdown) =>
        Promise.resolve(converter.makeHtml(markdown))
      }
      disablePreview
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

interface ReactMarkDownView {
  initialValue: string;
}

export const ReactMarkDownView = ({ initialValue }: ReactMarkDownView) => {
  const [selectedTab, setSelectedTab] = React.useState<"write" | "preview">(
    "preview"
  );
  return (
    <ReactMde
      maxEditorHeight={600}
      minPreviewHeight={600}
      maxPreviewHeight={600}
      value={initialValue}
      selectedTab={selectedTab}
      onTabChange={setSelectedTab}
      generateMarkdownPreview={(markdown) =>
        Promise.resolve(converter.makeHtml(markdown))
      }
      disablePreview
      loadSuggestions={loadSuggestions}
      childProps={{
        writeButton: {
          tabIndex: -1,
        },
      }}
    />
  );
};
export default ReactMarkDown;
