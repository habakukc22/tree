import "./App.css";
import { useState } from "react";

const files = {
  children: [
    {
      name: "node_modules",
      children: [
        {
          name: "joi",
          children: [
            {
              name: "node_modules",
            },
            {
              name: "package.json",
            },
          ],
        },
      ],
    },
    {
      name: "package.json",
    },
    {
      name: "vite.config.json",
    },
  ],
};

type TEentry = {
  name: string;
  children?: TEentry[];
};

function Entry({ entry, depth }: { entry: TEentry; depth: number }) {
  const [isExpanded, setIsExpended] = useState(false);

  return (
    <div>
      {entry.children ? (
        <button className="entry" onClick={() => setIsExpended(!isExpanded)}>
          {!isExpanded ? `+ ${entry.name}` : `- ${entry.name}`}
        </button>
      ) : (
        <div className="entry" onClick={() => setIsExpended(!isExpanded)}>
          {entry.name}
        </div>
      )}

      {isExpanded && (
        <div style={{ paddingLeft: `${depth * 10}px` }}>
          {entry.children?.map((entry) => (
            <Entry entry={entry} depth={depth + 1} />
          ))}
        </div>
      )}
    </div>
  );
}

function App() {
  return (
    <div className="App">
      {files.children.map((entry) => (
        <Entry entry={entry} depth={1} />
      ))}
    </div>
  );
}

export default App;
