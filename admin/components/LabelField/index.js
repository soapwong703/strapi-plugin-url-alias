import React, { useState, useEffect } from 'react';
import { useIntl } from 'react-intl';
import _ from 'lodash';

import { TextInput, Box, TextButton } from '@strapi/design-system';

const LabelField = ({
  values,
  setFieldValue,
  errors,
  touched,
  hint,
  code,
}) => {
  const [open, setOpen] = useState(false);
  const { formatMessage } = useIntl();
  const generatedCode = code || _.snakeCase(_.deburr(_.toLower(values.label || '')));

  useEffect(() => {
    if (errors.code) {
      setOpen(true);
    }
  }, [errors]);

  return (
    <Box>
      <TextInput
        name="label"
        value={values.label || ''}
        onChange={(e) => setFieldValue('label', e.target.value)}
        label={formatMessage({
          id: 'settings.form.label.label',
          defaultMessage: 'Label',
        })}
        error={
          errors.label && touched.label
            ? formatMessage({ id: errors.label, defaultMessage: 'Invalid value' })
            : null
        }
      />
      {(generatedCode && !open) && (
        <Box style={{ display: 'flex', marginTop: 5 }}>
          {hint(generatedCode)}
          <TextButton style={{ marginLeft: 5 }} onClick={() => setOpen(true)}>Edit</TextButton>
        </Box>
      )}

      {open && (
        <Box style={{ marginTop: 20 }}>
          <TextInput
            name="code"
            value={values.code || generatedCode}
            onChange={(e) => setFieldValue('code', e.target.value)}
            label={formatMessage({
              id: 'global.sde',
              defaultMessage: 'Code',
            })}
            error={
              errors.code
                ? formatMessage({ id: errors.code, defaultMessage: 'This value must be unique' })
                : null
            }
          />
        </Box>
      )}
    </Box>
  );
};

export default LabelField;
