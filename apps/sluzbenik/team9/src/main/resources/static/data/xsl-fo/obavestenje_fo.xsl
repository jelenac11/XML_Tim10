<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet
	xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
	xmlns:fo="http://www.w3.org/1999/XSL/Format"
	xmlns:ob="http://www.projekat.org/obavestenje"
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
					<fo:block font-family="Times New Roman" margin-top="30pt"
						font-size="11pt" text-align="left">
						<xsl:value-of
							select="concat(/ob:obavestenje/ob:informacije_o_obavestenju/ob:organ/common:naziv, ' ')"></xsl:value-of>
					</fo:block>
					<fo:block font-family="Times New Roman" text-align="left"
						font-size="11pt">
						<xsl:value-of
							select="concat(/ob:obavestenje/ob:informacije_o_obavestenju/ob:organ/common:adresa/common:ulica, ' ')"></xsl:value-of>
						<xsl:value-of
							select="/ob:obavestenje/ob:informacije_o_obavestenju/ob:organ/common:adresa/common:broj"></xsl:value-of>
						<xsl:text>,</xsl:text>
						<xsl:value-of
							select="/ob:obavestenje/ob:informacije_o_obavestenju/ob:organ/common:adresa/common:mesto"></xsl:value-of>
					</fo:block>
					<fo:block font-family="Times New Roman" text-align="left"
						font-size="11pt">
						(назив и седиште органа)
					</fo:block>
					<fo:block font-family="Times New Roman" text-align="left"
						font-size="11pt">
						Број предмета:
						<xsl:value-of select="/ob:obavestenje/@broj_zahteva"></xsl:value-of>
					</fo:block>
					<fo:block font-family="Times New Roman" text-align="left"
						font-size="11pt">
						Датум:
						<fo:inline text-indent="4em">
							<xsl:value-of
								select="/ob:obavestenje/ob:informacije_o_obavestenju/ob:datum_obavestenja"></xsl:value-of>
						</fo:inline>
					</fo:block>
					<fo:block font-family="Times New Roman" text-align="left"
						font-size="11pt" margin-top="11pt">
						<xsl:value-of
							select="/ob:obavestenje/ob:informacije_o_obavestenju/ob:trazilac/common:naziv"></xsl:value-of>
						<xsl:value-of
							select="concat(/ob:obavestenje/ob:informacije_o_obavestenju/ob:trazilac/common:ime, ' ')"></xsl:value-of>
						<xsl:value-of
							select="/ob:obavestenje/ob:informacije_o_obavestenju/ob:trazilac/common:prezime"></xsl:value-of>
					</fo:block>
					<fo:block font-family="Times New Roman" text-align="left"
						font-size="11pt">
						<xsl:value-of
							select="concat(/ob:obavestenje/ob:informacije_o_obavestenju/ob:trazilac/common:adresa/common:ulica, ' ')"></xsl:value-of>
						<xsl:value-of
							select="/ob:obavestenje/ob:informacije_o_obavestenju/ob:trazilac/common:adresa/common:broj"></xsl:value-of>
						<xsl:text>,</xsl:text>
						<xsl:value-of
							select="/ob:obavestenje/ob:informacije_o_obavestenju/ob:trazilac/common:adresa/common:mesto"></xsl:value-of>
					</fo:block>
					<fo:block font-family="Times New Roman" text-align="left"
						font-size="11pt">
						Име и презиме / назив / и адреса подносиоца захтева
					</fo:block>
					<fo:block font-family="Times New Roman"
						text-align="center" font-size="12pt" margin-top="22pt"
						font-weight="bold">
						О Б А В Е Ш Т Е Њ Е
					</fo:block>
					<xsl:if
						test="/ob:obavestenje/ob:odgovor_na_zahtev/ob:zahtevi/ob:informacije_o_uvidu">
						<fo:block font-family="Times New Roman"
							text-align="center" font-size="11pt" font-weight="bold">
							о стављању на
							увид документа
						</fo:block>
					</xsl:if>
					<xsl:if
						test="/ob:obavestenje/ob:odgovor_na_zahtev/ob:zahtevi/ob:informacije_o_posedovanju">
						<fo:block font-family="Times New Roman"
							text-align="center" font-size="11pt" font-weight="bold">
							о поседовању
							документа
						</fo:block>
					</xsl:if>
					<xsl:if
						test="/ob:obavestenje/ob:odgovor_na_zahtev/ob:zahtevi/ob:informacije_o_izradi_kopije">
						<fo:block font-family="Times New Roman"
							text-align="center" font-size="11pt" font-weight="bold">
							о изради копије
						</fo:block>
					</xsl:if>
					<xsl:if
						test="/ob:obavestenje/ob:odgovor_na_zahtev/ob:zahtevi/ob:informacije_o_dostavljanju_dokumenta">
						<fo:block font-family="Times New Roman"
							text-align="center" font-size="11pt" font-weight="bold">
							о достављању
							документа
						</fo:block>
					</xsl:if>
					<fo:block font-family="Times New Roman"
						text-align="justify" font-size="11pt" margin-top="11pt"
						text-indent="4em">
						На основу члана 16. ст. 1. Закона о слободном приступу
						информацијама
						од јавног значаја, поступајући по вашем захтеву за
						слободан
						приступ информацијама од
						<fo:inline text-decoration="underline">
							<xsl:variable name="date"
								select="/ob:obavestenje/ob:zahtev/ob:datum_trazenja_informacija"
								as="xs:date" />
							<xsl:value-of
								select="format-date($date, 
                          '[M01].[D01].[Y0001].')" />
						</fo:inline>
						год., којим сте тражили увид у
						документ/е са информацијама о / у
						вези са:
					</fo:block>
					<fo:block font-family="Times New Roman"
						text-align="justify" font-size="11pt">
						<xsl:value-of
							select="/ob:obavestenje/ob:zahtev/ob:opis_trazene_informacije"></xsl:value-of>
					</fo:block>
					<fo:block font-family="Times New Roman"
						text-align="center" font-size="11pt">
						(опис тражене информације)
					</fo:block>
					<xsl:if
						test="/ob:obavestenje/ob:odgovor_na_zahtev/ob:zahtevi/ob:informacije_o_uvidu">
						<xsl:choose>
							<xsl:when
								test="contains(/ob:obavestenje/ob:odgovor_na_zahtev/ob:zahtevi/ob:informacije_o_uvidu/@status,'true')">
								<fo:block font-family="Times New Roman"
									text-align="justify" font-size="11pt" text-indent="4em"
									margin-top="11pt">
									Oбавештавамо вас да дана
									<fo:inline text-decoration="underline">
										<xsl:value-of
											select="/ob:obavestenje/ob:odgovor_na_zahtev/ob:zahtevi/ob:informacije_o_uvidu/ob:datum_uvida"></xsl:value-of>
									</fo:inline>
									,
									у
									<xsl:choose>
										<xsl:when
											test="/ob:obavestenje/ob:odgovor_na_zahtev/ob:zahtevi/ob:informacije_o_uvidu/ob:vreme_uvida/ob:tacno_vreme_uvida">
											<fo:inline text-decoration="underline">
												<xsl:value-of
													select="/ob:obavestenje/ob:odgovor_na_zahtev/ob:zahtevi/ob:informacije_o_uvidu/ob:vreme_uvida/ob:tacno_vreme_uvida"></xsl:value-of>
											</fo:inline>
										</xsl:when>
										<xsl:otherwise>
											/
										</xsl:otherwise>
									</xsl:choose>
									часова,
									односно у времену
									<xsl:choose>
										<xsl:when
											test="/ob:obavestenje/ob:odgovor_na_zahtev/ob:zahtevi/ob:informacije_o_uvidu/ob:vreme_uvida/ob:interval_uvida">
											од
											<fo:inline text-decoration="underline">
												<xsl:value-of
													select="/ob:obavestenje/ob:odgovor_na_zahtev/ob:zahtevi/ob:informacije_o_uvidu/ob:vreme_uvida/ob:interval_uvida/ob:od"></xsl:value-of>
											</fo:inline>
											до
											<fo:inline text-decoration="underline">
												<xsl:value-of
													select="/ob:obavestenje/ob:odgovor_na_zahtev/ob:zahtevi/ob:informacije_o_uvidu/ob:vreme_uvida/ob:interval_uvida/ob:do"></xsl:value-of>
											</fo:inline>
										</xsl:when>
										<xsl:otherwise>
											од / до /
										</xsl:otherwise>
									</xsl:choose>
									часова, у просторијама органа у
									<fo:inline text-decoration="underline">
										<xsl:value-of
											select="/ob:obavestenje/ob:odgovor_na_zahtev/ob:zahtevi/ob:informacije_o_uvidu/ob:mesto_uvida/common:mesto"></xsl:value-of>
									</fo:inline>
									ул.
									<fo:inline text-decoration="underline">
										<xsl:value-of
											select="/ob:obavestenje/ob:odgovor_na_zahtev/ob:zahtevi/ob:informacije_o_uvidu/ob:mesto_uvida/common:ulica"></xsl:value-of>
									</fo:inline>
									бр.
									<fo:inline text-decoration="underline">
										<xsl:value-of
											select="/ob:obavestenje/ob:odgovor_na_zahtev/ob:zahtevi/ob:informacije_o_uvidu/ob:mesto_uvida/common:broj"></xsl:value-of>
									</fo:inline>
									,
									канцеларија бр.
									<fo:inline text-decoration="underline">
										<xsl:value-of
											select="/ob:obavestenje/ob:odgovor_na_zahtev/ob:zahtevi/ob:informacije_o_uvidu/ob:mesto_uvida/ob:kancelarija"></xsl:value-of>
									</fo:inline>
									можете
									<fo:inline font-weight="bold">извршити увид</fo:inline>
									у документ/е у коме је садржана тражена
									информација.
								</fo:block>
							</xsl:when>
							<xsl:otherwise>
								<fo:block font-family="Times New Roman"
									text-align="justify" font-size="11pt" text-indent="4em"
									margin-top="11pt">
									Обавештавамо вас да ваш захтев за увид у документ/е
									у
									коме је
									садржана
									тражена информација
									<fo:inline font-weight="bold">није прихваћен</fo:inline>
									.
								</fo:block>
							</xsl:otherwise>
						</xsl:choose>
					</xsl:if>
					<xsl:if
						test="/ob:obavestenje/ob:odgovor_na_zahtev/ob:zahtevi/ob:informacije_o_posedovanju">
						<xsl:choose>
							<xsl:when
								test="contains(/ob:obavestenje/ob:odgovor_na_zahtev/ob:zahtevi/ob:informacije_o_posedovanju/@status,'true')">
								<xsl:choose>
									<xsl:when
										test="contains(/ob:obavestenje/ob:odgovor_na_zahtev/ob:zahtevi/ob:informacije_o_posedovanju/@poseduje,'true')">
										<fo:block font-family="Times New Roman"
											text-align="justify" font-size="11pt" text-indent="4em"
											margin-top="11pt">
											Овом приликом вас обавештавамо да
											<fo:inline font-weight="bold">поседујемо</fo:inline>
											информације које
											сте навели у захтеву.
										</fo:block>
									</xsl:when>
									<xsl:otherwise>
										<fo:block font-family="Times New Roman"
											text-align="justify" font-size="11pt" text-indent="4em"
											margin-top="11pt">
											Нажалост,
											<fo:inline font-weight="bold">не поседујемо</fo:inline>
											информације које сте навели у
											захтеву.
										</fo:block>
									</xsl:otherwise>
								</xsl:choose>
							</xsl:when>
							<xsl:otherwise>
								<fo:block font-family="Times New Roman"
									text-align="justify" font-size="11pt" text-indent="4em"
									margin-top="11pt">
									Нажалост,
									<fo:inline font-weight="bold">не можемо вам рећи</fo:inline>
									да ли поседујемо информације
									које сте
									тражили у захтеву.
								</fo:block>
							</xsl:otherwise>
						</xsl:choose>
					</xsl:if>
					<xsl:if
						test="/ob:obavestenje/ob:odgovor_na_zahtev/ob:zahtevi/ob:informacije_o_izradi_kopije">
						<xsl:choose>
							<xsl:when
								test="contains(/ob:obavestenje/ob:odgovor_na_zahtev/ob:zahtevi/ob:informacije_o_izradi_kopije/@status,'true')">
								<fo:block font-family="Times New Roman"
									text-align="justify" font-size="11pt" text-indent="4em"
									margin-top="11pt">
									Обавештавамо вас да је ваш захтев за издавaњем копије
									документа/ата у коме
									је садржана тражена информација
									<fo:inline font-weight="bold">прихваћен</fo:inline>.
								</fo:block>
							</xsl:when>
							<xsl:otherwise>
								<fo:block font-family="Times New Roman"
									text-align="justify" font-size="11pt" text-indent="4em"
									margin-top="11pt">
									Обавештавамо вас да ваш захтев за издавaњем копије
									документа/ата
									у коме је
									садржана тражена информација
									<fo:inline font-weight="bold">није
										прихваћен
									</fo:inline>.
								</fo:block>
							</xsl:otherwise>
						</xsl:choose>
					</xsl:if>
					<xsl:if
						test="/ob:obavestenje/ob:odgovor_na_zahtev/ob:zahtevi/ob:informacije_o_dostavljanju_dokumenta">
						<xsl:choose>
							<xsl:when
								test="contains(/ob:obavestenje/ob:odgovor_na_zahtev/ob:zahtevi/ob:informacije_o_dostavljanju_dokumenta/@status,'true')">
								<fo:block font-family="Times New Roman"
									text-align="justify" font-size="11pt" text-indent="4em"
									margin-top="11pt">
									Обавештавамо вас да је ваш захтев за достављање
									документа/ата у
									коме је
									садржана тражена информација
									<fo:inline font-weight="bold">прихваћен</fo:inline>.
								</fo:block>
							</xsl:when>
							<xsl:otherwise>
								<fo:block font-family="Times New Roman"
									text-align="justify" font-size="11pt" text-indent="4em"
									margin-top="11pt">
									Обавештавамо вас да ваш захтев за достављање
									документа/ата у
									коме је
									садржана тражена информација
									<fo:inline font-weight="bold">није
										прихваћен
									</fo:inline>.
								</fo:block>
							</xsl:otherwise>
						</xsl:choose>
					</xsl:if>
					<xsl:if
						test="/ob:obavestenje/ob:odgovor_na_zahtev/ob:uplata_troskova">
						<fo:block font-family="Times New Roman"
							text-align="justify" font-size="11pt" margin-top="11pt">
							Трошкови су утврђени Уредбом Владе Републике Србије („Сл. гласник
							РС“, бр. 8/06), и то:
							<xsl:for-each
								select="/ob:obavestenje/ob:odgovor_na_zahtev/ob:uplata_troskova/ob:troskovi/ob:trosak">
								<xsl:value-of select="concat(ob:stavka, ' ')" />
								<xsl:value-of select="ob:kolicina" />
								комад/а износи
								<xsl:value-of select="ob:jedinicna_cijena" />
								динара по комаду
							</xsl:for-each>
							.
						</fo:block>
						<fo:block font-family="Times New Roman"
							text-align="justify" font-size="11pt" text-indent="4em"
							margin-top="11pt">
							Износ укупних трошкова износи
							<fo:inline text-decoration="underline">
								<xsl:value-of
									select="/ob:obavestenje/ob:odgovor_na_zahtev/ob:uplata_troskova/ob:uplatnica/ob:iznos"></xsl:value-of>
							</fo:inline>
							динара
							и уплаћује се на жиро-рачун
							<fo:inline text-decoration="underline">
								<xsl:value-of
									select="/ob:obavestenje/ob:odgovor_na_zahtev/ob:uplata_troskova/ob:uplatnica/ob:primalac"></xsl:value-of>
							</fo:inline>
							бр.
							<fo:inline text-decoration="underline">
								<xsl:value-of
									select="/ob:obavestenje/ob:odgovor_na_zahtev/ob:uplata_troskova/ob:uplatnica/ob:racun"></xsl:value-of>
							</fo:inline>
							, с позивом на број
							<fo:inline text-decoration="underline">
								<xsl:value-of
									select="/ob:obavestenje/ob:odgovor_na_zahtev/ob:uplata_troskova/ob:uplatnica/ob:poziv_na_broj"></xsl:value-of>
							</fo:inline>
							– ознака шифре општине/града где се налази орган власти
							(из
							Правилника о условима и начину вођења рачуна – „Сл. гласник
							РС“,
							20/07... 40/10).
						</fo:block>
					</xsl:if>
					<fo:block font-family="Times New Roman" text-align="left"
						font-size="11pt" margin-top="11pt">
						Достављено:
					</fo:block>
					<xsl:choose>
						<xsl:when
							test="/ob:obavestenje/ob:dostavljeno/ob:imenovanom and /ob:obavestenje/ob:dostavljeno/ob:arhivi">
							<fo:block font-family="Times New Roman"
								text-align="left" font-size="11pt">
								1. Именованом
							</fo:block>
							<fo:block font-family="Times New Roman"
								text-align="left" font-size="11pt">
								2. Архиви
							</fo:block>
						</xsl:when>
						<xsl:when
							test="/ob:obavestenje/ob:dostavljeno/ob:imenovanom and not(/ob:obavestenje/ob:dostavljeno/ob:arhivi)">
							<fo:block font-family="Times New Roman"
								text-align="left" font-size="11pt">
								1. Именованом
							</fo:block>
						</xsl:when>
						<xsl:when
							test="not(/ob:obavestenje/ob:dostavljeno/ob:imenovanom) and /ob:obavestenje/ob:dostavljeno/ob:arhivi">
							<fo:block font-family="Times New Roman"
								text-align="left" font-size="11pt">
								1. Архиви
							</fo:block>
						</xsl:when>
						<xsl:otherwise>
						</xsl:otherwise>
					</xsl:choose>
					<fo:block font-family="Times New Roman"
						text-align="center" font-size="11pt" margin-top="-20pt">
						(М.П.)
					</fo:block>
				</fo:flow>
			</fo:page-sequence>
		</fo:root>
	</xsl:template>
</xsl:stylesheet>