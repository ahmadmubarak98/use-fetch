import type { Meta, StoryObj } from "@storybook/react";
import { UseFetchProps } from "../../types";
import { defaultOptions, useFetch } from "../../hooks/use-fetch";

const Example: React.FC<UseFetchProps> = (props) => {
  const { isLoading, data, error } = useFetch(props);

  return (
    <div>
      {isLoading ? "Loading..." : "Data loaded"}
      {JSON.stringify(data)}
      {JSON.stringify(error)}
    </div>
  );
};

const meta: Meta<typeof Example> = {
  title: "hooks/useFetch",
  component: Example,
  argTypes: {
    url: {
      control: {
        type: "text",
      },
      description: "URL to fetch data from",
      defaultValue: "https://jsonplaceholder.typicode.com/posts/1",
    },
    options: {
      control: {
        type: "object",
      },
      description: "Fetch options",
    },
  },
  parameters: {
    controls: { expanded: true },
  },
};

export default meta;

type Story = StoryObj<typeof Example>;

export const Get: Story = {
  args: {
    url: "https://jsonplaceholder.typicode.com/posts/1",
    options: defaultOptions,
  },
};
