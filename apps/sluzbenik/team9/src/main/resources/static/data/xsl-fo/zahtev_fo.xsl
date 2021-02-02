<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet
	xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
	xmlns:fo="http://www.w3.org/1999/XSL/Format"
	xmlns:za="http://www.projekat.org/zahtev"
	xmlns:common="http://www.projekat.org/common"
	xmlns:xs="http://www.w3.org/2001/XMLSchema" version="2.0">

	<xsl:template match="/">
		<fo:root>
			<fo:layout-master-set>
				<fo:simple-page-master
					master-name="bookstore-page">
					<fo:region-body margin-top="0.75in"
						margin-bottom="0.75in" margin-left="80pt" margin-right="80pt" />
				</fo:simple-page-master>
			</fo:layout-master-set>

			<fo:page-sequence master-reference="bookstore-page">
				<fo:flow flow-name="xsl-region-body">
					<fo:block font-family="Times New Roman" width="60%"
						margin-top="10pt" text-align="center" border="none">
						<xsl:value-of
							select="/za:zahtev_gradjana/za:organ/common:naziv"></xsl:value-of>
						,
						<xsl:value-of
							select="concat(/za:zahtev_gradjana/za:organ/common:adresa/common:ulica, ' ')"></xsl:value-of>
						<xsl:value-of
							select="/za:zahtev_gradjana/za:organ/common:adresa/common:broj"></xsl:value-of>
						,
						<xsl:value-of
							select="/za:zahtev_gradjana/za:organ/common:adresa/common:mesto"></xsl:value-of>
					</fo:block>
					<fo:block margin-top="0pt" margin-bottom="0pt"
						text-align="center" font-size="12pt" font-family="Times New Roman">
						назив и седиште
						органа коме се захтев упућује
					</fo:block>
					<fo:block font-family="Times New Roman" font-size="14pt"
						font-weight="bold" text-align="center" margin-top="48pt">
						З А Х Т Е В
					</fo:block>
					<fo:block font-family="Times New Roman" font-size="14pt"
						font-weight="bold" text-align="center">
						за приступ информацији од јавног
						значаја
					</fo:block>
					<fo:block font-family="Times New Roman" font-size="12pt"
						text-align="justify" text-indent="4em" margin-top="28pt">
						На основу члана
						15. ст. 1. Закона о слободном приступу информацијама од јавног
						значаја („Службени гласник РС“, бр. 120/04, 54/07, 104/09 и
						36/10), од горе наведеног органа захтевам:*
					</fo:block>
					<fo:block text-indent="4em" font-size="12pt"
						font-family="Times New Roman" margin-top="12pt">
						<xsl:choose>
							<xsl:when
								test="/za:zahtev_gradjana/za:informacije_vezane_za_zahtev/za:tip_zahteva/za:obavestenje_posedovanja_informacije">
								<fo:inline font-size="12pt" font-family="MS Gothic">
									☑
								</fo:inline>
							</xsl:when>
							<xsl:otherwise>
								<fo:inline font-size="12pt" font-family="MS Gothic">
									☐
								</fo:inline>
							</xsl:otherwise>
						</xsl:choose>
						обавештење да ли поседује тражену информацију;
					</fo:block>
					<fo:block text-indent="4em" font-size="12pt"
						font-family="Times New Roman">
						<xsl:choose>
							<xsl:when
								test="/za:zahtev_gradjana/za:informacije_vezane_za_zahtev/za:tip_zahteva/za:uvid_u_dokument">
								<fo:inline font-size="12pt" font-family="MS Gothic">
									☑
								</fo:inline>
							</xsl:when>
							<xsl:otherwise>
								<fo:inline font-size="12pt" font-family="MS Gothic">
									☐
								</fo:inline>
							</xsl:otherwise>
						</xsl:choose>
						увид у документ који садржи тражену информацију;
					</fo:block>
					<fo:block text-indent="4em" font-size="12pt"
						font-family="Times New Roman">
						<xsl:choose>
							<xsl:when
								test="/za:zahtev_gradjana/za:informacije_vezane_za_zahtev/za:tip_zahteva/za:kopiju_dokumenta">
								<fo:inline font-size="12pt" font-family="MS Gothic">
									☑
								</fo:inline>
							</xsl:when>
							<xsl:otherwise>
								<fo:inline font-size="12pt" font-family="MS Gothic">
									☐
								</fo:inline>
							</xsl:otherwise>
						</xsl:choose>
						копију документа који садржи тражену информацију;
					</fo:block>
					<fo:block text-indent="4em" font-size="12pt"
						font-family="Times New Roman">
						<xsl:choose>
							<xsl:when
								test="/za:zahtev_gradjana/za:informacije_vezane_za_zahtev/za:tip_zahteva/za:dostavljanje_kopije">
								<fo:inline font-size="12pt" font-family="MS Gothic">
									☑
								</fo:inline>
							</xsl:when>
							<xsl:otherwise>
								<fo:inline font-size="12pt" font-family="MS Gothic">
									☐
								</fo:inline>
							</xsl:otherwise>
						</xsl:choose>
						достављање копије документа који садржи тражену информацију:**
					</fo:block>
					<fo:block text-indent="8em" font-size="12pt"
						font-family="Times New Roman">
						<xsl:choose>
							<xsl:when
								test="/za:zahtev_gradjana/za:informacije_vezane_za_zahtev/za:tip_zahteva/za:dostavljanje_kopije/za:posta">
								<fo:inline font-size="12pt" font-family="MS Gothic">
									☑
								</fo:inline>
							</xsl:when>
							<xsl:otherwise>
								<fo:inline font-size="12pt" font-family="MS Gothic">
									☐
								</fo:inline>
							</xsl:otherwise>
						</xsl:choose>
						поштом
					</fo:block>
					<fo:block text-indent="8em" font-size="12pt"
						font-family="Times New Roman">
						<xsl:choose>
							<xsl:when
								test="/za:zahtev_gradjana/za:informacije_vezane_za_zahtev/za:tip_zahteva/za:dostavljanje_kopije/za:faks">
								<fo:inline font-size="12pt" font-family="MS Gothic">
									☑
								</fo:inline>
							</xsl:when>
							<xsl:otherwise>
								<fo:inline font-size="12pt" font-family="MS Gothic">
									☐
								</fo:inline>
							</xsl:otherwise>
						</xsl:choose>
						факсом
					</fo:block>
					<fo:block text-indent="8em" font-size="12pt"
						font-family="Times New Roman">
						<xsl:choose>
							<xsl:when
								test="/za:zahtev_gradjana/za:informacije_vezane_za_zahtev/za:tip_zahteva/za:dostavljanje_kopije/za:eposta">
								<fo:inline font-size="12pt" font-family="MS Gothic">
									☑
								</fo:inline>
							</xsl:when>
							<xsl:otherwise>
								<fo:inline font-size="12pt" font-family="MS Gothic">
									☐
								</fo:inline>
							</xsl:otherwise>
						</xsl:choose>
						електронском поштом
					</fo:block>
					<fo:block text-indent="8em" font-size="12pt"
						font-family="Times New Roman">
						<xsl:choose>
							<xsl:when
								test="/za:zahtev_gradjana/za:informacije_vezane_za_zahtev/za:tip_zahteva/za:dostavljanje_kopije/za:drugi_nacin">
								<fo:inline font-size="12pt" font-family="MS Gothic">
									☑
								</fo:inline>
							</xsl:when>
							<xsl:otherwise>
								<fo:inline font-size="12pt" font-family="MS Gothic">
									☐
								</fo:inline>
							</xsl:otherwise>
						</xsl:choose>
						 на други начин:*** <xsl:value-of
								select="/za:zahtev_gradjana/za:informacije_vezane_za_zahtev/za:tip_zahteva/za:dostavljanje_kopije/za:drugi_nacin"></xsl:value-of>
					</fo:block>
					<fo:block font-family="Times New Roman" font-size="12pt"
						text-align="justify" text-indent="4em" margin-top="12pt">
						Овај захтев се
						односи на следеће
						информације:
					</fo:block>
					<fo:block font-family="Times New Roman" font-size="12pt"
						text-align="justify" text-indent="4em">
						<xsl:value-of
							select="/za:zahtev_gradjana/za:informacije_vezane_za_zahtev/za:opis_zahteva"></xsl:value-of>
					</fo:block>
					<fo:block font-family="Times New Roman" font-size="9pt"
						text-align="justify">
						(навести што прецизнији опис информације која се тражи
						као и друге податке
						који олакшавају проналажење тражене
						информације)
					</fo:block>
					<fo:block font-family="Times New Roman" font-size="10pt"
						text-align="right" margin-top="27pt">
						<xsl:value-of
							select="/za:zahtev_gradjana/za:trazilac/za:lice/common:naziv"></xsl:value-of>
						<xsl:value-of
							select="concat(/za:zahtev_gradjana/za:trazilac/za:lice/common:ime, ' ')"></xsl:value-of>
						<xsl:value-of
							select="/za:zahtev_gradjana/za:trazilac/za:lice/common:prezime"></xsl:value-of>
					</fo:block>
					<fo:block font-family="Times New Roman" font-size="10pt"
						text-align="right">
						Тражилац информације/Име и презиме
					</fo:block>
					<fo:block font-family="Times New Roman" font-size="10pt"
						text-align="right" margin-top="10pt">
						<xsl:value-of
							select="concat(/za:zahtev_gradjana/za:trazilac/za:lice/common:adresa/common:ulica, ' ')"></xsl:value-of>
						<xsl:value-of
							select="/za:zahtev_gradjana/za:trazilac/za:lice/common:adresa/common:broj"></xsl:value-of>
						,
						<xsl:value-of
							select="/za:zahtev_gradjana/za:trazilac/za:lice/common:adresa/common:mesto"></xsl:value-of>
					</fo:block>
					<fo:block font-family="Times New Roman" font-size="10pt"
						text-align="right">
						адреса
					</fo:block>
					<fo:block font-family="Times New Roman" font-size="10pt"
						text-align="right" margin-top="10pt">
						<xsl:value-of
							select="/za:zahtev_gradjana/za:trazilac/za:drugi_podatak_za_kontakt"></xsl:value-of>
					</fo:block>
					<fo:block font-family="Times New Roman" font-size="10pt"
						text-align="right">
						други подаци за контакт
					</fo:block>
					<fo:block font-family="Times New Roman" font-size="10pt"
						text-align="left" margin-top="-50pt">
						У
						<xsl:value-of
							select="/za:zahtev_gradjana/za:informacije_vezane_za_zahtev/za:mesto"></xsl:value-of>
						,
					</fo:block>
					<fo:block font-family="Times New Roman" font-size="10pt"
						text-align="left" margin-top="20pt">
						дана
						<xsl:variable name="currenttime"
							select="current-dateTime()" as="xs:dateTime" />
						<xsl:if
							test="number(format-dateTime($currenttime,'[D]')) gt 9">
							<xsl:value-of
								select="format-dateTime($currenttime,'[D]')" />
						</xsl:if>
						<xsl:if
							test="number(format-dateTime($currenttime,'[D]')) lt 10">
							<xsl:text>0</xsl:text>
							<xsl:value-of
								select="format-dateTime($currenttime,'[D]')" />
						</xsl:if>
						<xsl:text>.</xsl:text>
						<xsl:if
							test="number(format-dateTime($currenttime,'[M]')) gt 9">
							<xsl:value-of
								select="format-dateTime($currenttime,'[M]')" />
						</xsl:if>
						<xsl:if
							test="number(format-dateTime($currenttime,'[M]')) lt 10">
							<xsl:text>0</xsl:text>
							<xsl:value-of
								select="format-dateTime($currenttime,'[M]')" />
						</xsl:if>
						<xsl:text>.</xsl:text>
						<xsl:value-of
							select="format-dateTime($currenttime,'[Y]')" />. године
					</fo:block>
					<fo:block font-family="Times New Roman" font-size="9pt"
						text-align="justify" margin-top="40pt">
						__________________________________________
					</fo:block>
					<fo:block font-family="Times New Roman" font-size="9pt"
						text-align="justify">
						* У кућици означити која законска права на приступ
						информацијама желите да остварите.
					</fo:block>
					<fo:block font-family="Times New Roman" font-size="9pt"
						text-align="justify">
						** У кућици означити начин достављања копије
						докумената.
					</fo:block>
					<fo:block font-family="Times New Roman" font-size="9pt"
						text-align="justify">
						*** Када захтевате други начин достављања обавезно
						уписати који начин достављања захтевате.
					</fo:block>
				</fo:flow>
			</fo:page-sequence>
		</fo:root>
	</xsl:template>
</xsl:stylesheet>