import { leeRequest } from '..'

export interface PasswordProps {
  oldpassword: string
  password: string
  repassword: string
}

export function loginRequest(account: any) {
  return leeRequest.post({
    url: '/login',
    data: account
  })
}

export function getUserInfo() {
  return leeRequest.get({
    url: '/getUserInfo'
  })
}

export function updatepassword(id: number, passwords: PasswordProps) {
  return leeRequest.post({
    url: `/updatePassword/${id}/`,
    data: {
      new_password: passwords.password,
      confirm_password: passwords.repassword,
      old_password: passwords.oldpassword
    }
  })
}
