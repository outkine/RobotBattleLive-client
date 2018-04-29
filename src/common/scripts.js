import path from 'path'

export function staticFile(path_) {
  return path.join(__static, path_)
}
