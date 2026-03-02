import type { Meta, StoryObj } from "@storybook/react";
import type { StoryContext } from "@storybook/react";
import { useState } from "react";
import { Dialog, type DialogProps } from "@consumer/components/Dialog";
import { AlertTriangle, CheckCircle } from "lucide-react";
import { Button } from "@consumer/components/Button";

const meta: Meta<DialogProps> = {
  title: "Components/Dialog",
  component: Dialog,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<DialogProps>;

const DialogExample = (args: DialogProps & { isRtl?: boolean }) => {
  const { isRtl, ...dialogArgs } = args;
  const [open, setOpen] = useState(true);
  return (
    <>
      <Button onClick={() => setOpen(true)}>Open Dialog</Button>
      <Dialog
        {...dialogArgs}
        isRtl={isRtl}
        config={{
          ...dialogArgs.config,
          open,
          onOpenChange: setOpen,
        }}
      />
    </>
  );
};

export const Confirmation: Story = {
  render: (args, context: StoryContext) => (
    <DialogExample
      {...args}
      isRtl={context.globals?.nbsDirection === "rtl"}
    />
  ),
  args: {
    config: {
      title: "Delete item",
      description: "This action cannot be undone.",
      icon: { component: AlertTriangle, variant: "danger" },
      footer: {
        actions: {
          secondary: { label: "Cancel", onClick: () => undefined },
          primary: {
            label: "Delete",
            onClick: () => undefined,
            variant: "danger",
          },
        },
        alignment: "right",
      },
      variant: "confirmation",
      size: "sm",
    },
  },
};

export const Alert: Story = {
  render: (args, context: StoryContext) => (
    <DialogExample
      {...args}
      isRtl={context.globals?.nbsDirection === "rtl"}
    />
  ),
  args: {
    config: {
      title: "Success",
      description: "Your changes have been saved.",
      icon: { component: CheckCircle, variant: "success" },
      showCloseButton: true,
      closeOnOverlayClick: true,
      size: "xs",
      variant: "alert",
    },
  },
};
