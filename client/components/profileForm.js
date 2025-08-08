import { Formik } from 'formik';
import * as Yup from 'yup';
import { Input, CheckBox , Text, Button } from 'react-native-elements';

export default function ProfileForm() {
  const initialValues = {
    name: '',
    email: '',
    password: '',
    phone: '',
    userType: false,
    specialization: '',
    workingHours: '',
    location: '',
    latitude: '',
    longitude: ''
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('الاسم الكامل مطلوب'),
    email: Yup.string().email('البريد الإلكتروني غير صالح').required('البريد الإلكتروني مطلوب'),
    password: Yup.string().min(6, 'كلمة المرور يجب أن تكون على الأقل 6 أحرف').required('كلمة المرور مطلوبة'),
    phone: Yup.string().required('رقم الهاتف مطلوب'),
    userType: Yup.boolean(),
    specialization: Yup.string().when('userType', {
      is: true,
      then: Yup.string().required('التخصص مطلوب')
    }),
    workingHours: Yup.string().when('userType', {
      is: true,
        then: Yup.string().required('ساعات العمل مطلوبة')
    }),
    location: Yup.string().required('الموقع مطلوب'),
  });
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values) => {props.submit(values);}}>
      {({ handleChange, handleBlur, handleSubmit, setFieldValue, values, errors, touched , isValid }) => (
        <>
        <Input
          name="name"
          placeholder="الاسم الكامل"
          values={values.name}
            onChangeText={handleChange('name')}
            onBlur={handleBlur('name')}
        />
        {errors.name && touched.name && <Text style={{ color: 'red' }}>{errors.name}</Text>}

        <Input
          name="email"
          placeholder="البريد الإلكتروني"
          values={values.email}
          onChangeText={handleChange('email')}
          onBlur={handleBlur('email')}
        />
        {errors.email && touched.email && <Text style={{ color: 'red' }}>{errors.email}</Text>}
        <Input
          name="password"
          placeholder="كلمة المرور"
          values={values.password}
          secureTextEntry
            onChangeText={handleChange('password')}
            onBlur={handleBlur('password')}
        />
        {errors.password && touched.password && <Text style={{ color: 'red' }}>{errors.password}</Text>}
        <Input
          name="phone"
          placeholder="رقم الهاتف"
          values={values.phone}
            onChangeText={handleChange('phone')}
            onBlur={handleBlur('phone')}
        />
        {errors.phone && touched.phone && <Text style={{ color: 'red' }}>{errors.phone}</Text>}
        <CheckBox
          title="أنا طبيب"
          name="userType"
          checked={values.userType}
          onPress={() => setFieldValue('userType', !values.userType)}
        />
        {values.userType && (
        <>
            <Input
            name="specialization"
            placeholder="التخصص"
            values={values.specialization}
                onChangeText={handleChange('specialization')}
                onBlur={handleBlur('specialization')}
            />
            
            <Input
            name="workingHours"
            placeholder="ساعات العمل"
            values={values.workingHours}
                onChangeText={handleChange('workingHours')}
                onBlur={handleBlur('workingHours')}
            />
            <Input
            name="location"
            placeholder="الموقع"
            values={values.location}
                onChangeText={handleChange('location')}
                onBlur={handleBlur('location')}
            />
        </>
        )}
        <Button title={"تسجيل الدخول "} style={{marginTop: "20px"}} onPress={handleSubmit} disabled={!isValid} ></Button>
        </>
      )}
    </Formik>
  );
}