import { Image } from 'react-native'

interface LogoProps extends React.ComponentProps<typeof Image> {}
export function Logo({ ...props }: LogoProps) {
  return <Image source={require('../../assets/images/logo.png')} {...props} />
}
