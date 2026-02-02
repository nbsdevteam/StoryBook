import * as React from "react";
import { Button } from "../Button";
import { Input } from "../Input";
import { Textarea } from "../Textarea";
import { Select } from "../Select";
import { Checkbox } from "../Checkbox";
import { Radio } from "../Radio";
import { Switch } from "../Switch";
import { cn } from "../../utils/cn";
import styles from "./Form.module.css";
import { FormProps, FormField, FormSection } from "./Form.types";

const buildInitialValues = (fields: FormField[]) =>
  fields.reduce<Record<string, any>>((acc, field) => {
    acc[field.name] = field.defaultValue ?? (field.type === "checkbox" ? false : "");
    return acc;
  }, {});

export const Form: React.FC<FormProps> = ({ config, className }) => {
  if (!config) return null;

  const allFields = config.sections
    ? config.sections.flatMap((section) => section.fields)
    : config.fields;

  const [values, setValues] = React.useState<Record<string, any>>(
    config.values ?? buildInitialValues(allFields)
  );
  const [errors, setErrors] = React.useState<Record<string, string>>(
    config.errors ?? {}
  );

  React.useEffect(() => {
    if (config.values) setValues(config.values);
  }, [config.values]);

  React.useEffect(() => {
    if (config.errors) setErrors(config.errors);
  }, [config.errors]);

  React.useEffect(() => {
    if (!config.autoSave?.enabled) return;
    const timeout = setTimeout(() => {
      config.autoSave?.onSave(values);
    }, config.autoSave.debounce ?? 1000);
    return () => clearTimeout(timeout);
  }, [values, config.autoSave]);

  const handleChange = (field: FormField, value: any) => {
    const next = { ...values, [field.name]: value };
    setValues(next);
    config.onValuesChange?.(next);
    field.onChange?.(value, next);
  };

  const validateField = (field: FormField, value: any) => {
    if (field.required && !value) return "This field is required";
    if (field.validation?.minLength && String(value).length < field.validation.minLength) {
      return `Minimum length is ${field.validation.minLength}`;
    }
    if (field.validation?.maxLength && String(value).length > field.validation.maxLength) {
      return `Maximum length is ${field.validation.maxLength}`;
    }
    if (field.validation?.pattern && !field.validation.pattern.test(String(value))) {
      return "Invalid format";
    }
    return field.validation?.custom?.(value);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const nextErrors: Record<string, string> = {};
    allFields.forEach((field) => {
      const error = validateField(field, values[field.name]);
      if (error) nextErrors[field.name] = error;
    });
    setErrors(nextErrors);
    config.onErrorsChange?.(nextErrors);
    if (Object.keys(nextErrors).length === 0) {
      config.onSubmit(values);
    }
  };

  const renderField = (field: FormField) => {
    if (typeof field.show === "function" && !field.show(values)) return null;
    if (field.show === false) return null;

    const fieldError = errors[field.name];
    const commonProps = {
      value: values[field.name],
      onChange: (e: any) =>
        handleChange(field, e?.target ? e.target.value : e),
      placeholder: field.placeholder,
      disabled: config.disabled || field.disabled,
    };

    let inputNode: React.ReactNode = null;

    if (field.type === "textarea") {
      inputNode = <Textarea {...commonProps} />;
    } else if (field.type === "select" || field.type === "multiselect") {
      inputNode = (
        <Select
          {...commonProps}
          options={field.options?.map((option) => ({
            label: option.label,
            value: option.value,
            disabled: option.disabled,
          }))}
          multiple={field.type === "multiselect"}
        />
      );
    } else if (field.type === "checkbox") {
      inputNode = (
        <Checkbox
          checked={!!values[field.name]}
          onChange={(e) => handleChange(field, e.target.checked)}
        />
      );
    } else if (field.type === "radio") {
      inputNode = (
        <Radio
          checked={!!values[field.name]}
          onChange={(e) => handleChange(field, e.target.checked)}
        />
      );
    } else if (field.type === "switch") {
      inputNode = (
        <Switch
          checked={!!values[field.name]}
          onChange={(e) => handleChange(field, e.target.checked)}
        />
      );
    } else if (field.type === "custom" && field.customComponent) {
      const Custom = field.customComponent;
      inputNode = (
        <Custom
          value={values[field.name]}
          onChange={(value: any) => handleChange(field, value)}
        />
      );
    } else {
      inputNode = (
        <Input
          {...commonProps}
          type={field.type === "datetime" ? "datetime-local" : field.type}
        />
      );
    }

    return (
      <div
        key={field.name}
        className={cn(styles.fieldWrapper, styles[`width_${field.width ?? "full"}`])}
      >
        {field.label && (
          <label className={styles.fieldLabel}>
            {field.label}
            {config.showRequiredIndicators && field.required && (
              <span className={styles.required}>*</span>
            )}
          </label>
        )}
        {inputNode}
        {field.description && (
          <div className={styles.fieldDescription}>{field.description}</div>
        )}
        {fieldError && <div className={styles.fieldError}>{fieldError}</div>}
      </div>
    );
  };

  const renderSection = (section: FormSection) => {
    return (
      <div key={section.id} className={cn(styles.section, section.className)}>
        {(section.title || section.description || section.icon) && (
          <div className={styles.sectionHeader}>
            {section.icon && <section.icon size={16} />}
            <div>
              {section.title && (
                <div className={styles.sectionTitle}>{section.title}</div>
              )}
              {section.description && (
                <div className={styles.sectionDescription}>
                  {section.description}
                </div>
              )}
            </div>
          </div>
        )}
        <div className={styles.fieldsGrid}>
          {section.fields.map(renderField)}
        </div>
      </div>
    );
  };

  return (
    <form
      className={cn(
        styles.form,
        styles[`layout_${config.layout ?? "vertical"}`],
        styles[`spacing_${config.spacing ?? "md"}`],
        className
      )}
      onSubmit={handleSubmit}
    >
      {config.sections
        ? config.sections.map(renderSection)
        : config.fields.map(renderField)}

      <div
        className={cn(
          styles.actions,
          styles[`actions${(config.submitButton?.position ?? "right")
            .charAt(0)
            .toUpperCase()}${(config.submitButton?.position ?? "right").slice(1)}`]
        )}
      >
        {config.cancelButton && (
          <Button
            variant="secondary"
            size="small"
            onClick={config.cancelButton.onClick}
          >
            {config.cancelButton.label ?? "Cancel"}
          </Button>
        )}
        {config.actions}
        <Button
          type="submit"
          variant="primary"
          size="small"
          loading={config.submitButton?.loading}
          disabled={config.submitButton?.disabled}
        >
          {config.submitButton?.label ?? "Submit"}
        </Button>
      </div>
    </form>
  );
};

export default Form;
