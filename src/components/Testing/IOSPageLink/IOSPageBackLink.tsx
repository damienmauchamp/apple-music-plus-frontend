import React from 'react'
import IOSPageLink, { iOSPageLinkProps } from './IOSPageLink'

const IOSPageBackLink = ({ children }: iOSPageLinkProps) => {
	return <IOSPageLink back={true}>{children}</IOSPageLink>
}

export default IOSPageBackLink
