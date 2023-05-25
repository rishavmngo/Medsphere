import './updateOrg.style.css'
import { Field, Form, Formik, useFormik } from 'formik'
import * as yup from 'yup'
import { Button, TextField } from '@mui/material'

const UpdateOrg = ({ user, updateOrganisation }) => {
  const validationSchema = yup.object({
    email: yup
      .string('Enter your email')
      .email('Enter a valid email')
      .required('Email is required'),
    password: yup
      .string('Enter your password')
      .min(8, 'Password should be of minimum 8 characters length')
      .required('Password is required'),
    confirmPassword: yup
      .string('Confirm your password')
      .oneOf([yup.ref('password')], 'Passwords must match')
      .required('Confirm password is required'),
    name: yup
      .string('Enter your organisation name')
      .required('Organisation name is requierd'),
    address: yup.string('Enter your organisation address').nullable(),
    phoneNumber: yup.string('Enter your organisation number').nullable(),
  })
  const formik = useFormik({
    initialValues: {
      email: user.email,
      name: user.displayname,
      phoneNumber: user.phone_number,
      address: user.address,
      password: user.password,
      confirmPassword: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(values)
      updateOrganisation(values)
    },
  })
  return (
    <div className='update-org-comp'>
      <Formik>
        <form className='org-update-form' onSubmit={formik.handleSubmit}>
          <TextField
            fullWidth
            id='email'
            name='email'
            label='Email'
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />

          <TextField
            fullWidth
            id='name'
            name='name'
            label='name'
            type='name'
            value={formik.values.name}
            onChange={formik.handleChange}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
          />

          <TextField
            fullWidth
            id='phoneNumber'
            name='phoneNumber'
            label='Phone Number'
            type='text'
            value={formik.values.phoneNumber}
            onChange={formik.handleChange}
            error={
              formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)
            }
            helperText={formik.touched.phoneNumber && formik.errors.phoneNumber}
          />
          <TextField
            fullWidth
            id='address'
            name='address'
            label='address'
            value={formik.values.address}
            onChange={formik.handleChange}
            error={formik.touched.address && Boolean(formik.errors.address)}
            helperText={formik.touched.address && formik.errors.address}
          />
          <TextField
            fullWidth
            id='password'
            name='password'
            label='Password'
            type='password'
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />

          <TextField
            fullWidth
            id='confirmPassword'
            name='confirmPassword'
            label='confirmPassword'
            type='password'
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            error={
              formik.touched.confirmPassword &&
              Boolean(formik.errors.confirmPassword)
            }
            helperText={
              formik.touched.confirmPassword && formik.errors.confirmPassword
            }
          />
          <Button color='primary' variant='contained' fullWidth type='submit'>
            Save Changes
          </Button>
        </form>
      </Formik>
    </div>
  )
}

export default UpdateOrg
