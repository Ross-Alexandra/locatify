import type { Preview } from "@storybook/react";
import React from "react";
import { MemoryRouter } from "react-router-dom";
import {Global} from "@emotion/react";

import {themes, ensure} from '@storybook/theming';

import {rootCSS} from "../src/App";

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    docs: {
        theme: themes.dark,
      },
  },
  decorators: [
    (Story) => (
        <MemoryRouter>
            <Story />
        </MemoryRouter>
    ),
    (Story) => (
        <>
            <Global styles={rootCSS} />
            <Story />
        </>
    ),
  ]
};

export default preview;
