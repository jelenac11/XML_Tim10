<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet
	xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
	xmlns:ob="http://www.projekat.org/obavestenje"
	xmlns:common="http://www.projekat.org/common"
	xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" version="2.0">
	<xsl:template match="/">
		<html>
			<head>
				<style>
					body {
					background-color: grey;
					}
					.c1 {
					padding-left: 50pt;
					margin: 0 auto;
					margin-top: 20pt;
					margin-bottom: 20pt;
					background-color: white;
					padding-right: 50pt;
					padding-top: 60pt;
					padding-bottom: 60pt;
					box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
					width: 40%;
					position: sticky;
					top: 25pt;
					}

					.c6 {
					font-family: 'Times New
					Roman';
					font-size: 12pt;
					text-align: center;
					}

					.c7 {
					text-align: center;
					}

					.c8 {
					font-family: 'Times New Roman';
					width: 60%;
					margin-top: 10pt;
					text-align: center;
					border: none
					}

					.c9 {
					margin-top: 0pt;
					margin-bottom: 0pt;
					text-align: center;
					font-size: 11pt;
					font-family:
					'Times New Roman';
					}

					.c17 {
					font-family: 'Times New Roman';
					}

					.c20 {
					margin-top: 0pt;
					margin-bottom: 0pt;
					text-align: justify;
					font-size:
					11pt;
					}

					.c21 {
					margin-top: 0pt;
					margin-bottom: 0pt;
					text-align: justify;
					font-size: 11pt;
					}

					.c22 {
					display: block;
					text-align: right;
					}

					.c23 {
					width: 200px;
					display: inline-block;
					margin-top: 20pt
					}

					.c24 {
					margin-top: -25pt;
					font-size: 11pt;
					font-family: 'Times New Roman';
					}

					.c25 {
					display: block;
					text-align: center;
					width: 100%;
					}

					.c26 {
					width:
					50%;
					display: inline-block;
					}

					.c27 {
					text-indent: 10pt;
					margin-top:
					-40pt;
					margin-bottom: 30pt;
					text-align: justify;
					font-size: 11pt;
					font-family: 'Times New Roman';
					}

					.c28 {
					width: 200px;
					margin-left:
					5px;
					display: inline-block;
					}

					.c29 {
					text-indent: 10pt;
					margin-top:
					-20pt;
					margin-bottom: 30pt;
					text-align: justify;
					font-size: 11pt;
					font-family: 'Times New Roman';
					}

					.c30 {
					width: 50%;
					margin-left: 2px;
					display: inline-block;
					}

					.c34 {
					font-family: 'Times New Roman';
					}

					.c35 {
					font-family: 'Times New Roman';
					font-size:
					9pt;
					}

					.c36 {
					font-family:
					'Times New Roman';
					width: 80%;
					border: none
					}

					.c37 {
					font-family: 'Times
					New Roman';
					font-size: 11pt;
					text-align:
					center;
					margin-top: -10pt;
					}

					.c38 {
					font-family: 'Times New Roman';
					font-size: 9pt;
					margin-top:
					-10pt;
					}

					.c39 {
					font-size: 11pt;
					font-family: 'Times New Roman';
					text-align:
					justify;
					}
					.c40 {
					margin-top: -10pt;
					font-size:
					11pt;
					font-family: 'Times New Roman';
					}

					.c44 {
					margin-top: 0pt;
					font-size:
					11pt;
					font-family: 'Times New Roman';
					}

					.c41 {
					margin-top:
					-10pt;
					margin-left: -6pt;
					font-size: 11pt;
					font-family: 'Times New
					Roman';
					}

					.c42 {
					font-family: 'Times New Roman';
					margin-top: -10pt;
					}

					.c43 {
					font-family: 'Times New
					Roman';
					font-size: 11pt;
					text-align: center;
					margin-top: -10pt;
					}

					.c45 {
					font-family: 'Times New Roman';
					}
					.c46 {
					font-family: 'Times New Roman';
					margin-top:-10pt;
					}

					tab1 {
					padding-left: 4em; }
					tab2 { padding-left: 8em; }
				</style>
			</head>
			<body>
				<div class="c1">
					<p class="c34">
						<xsl:value-of
							select="concat(/ob:obavestenje/ob:informacije_o_obavestenju/ob:organ/common:naziv, ' ')"></xsl:value-of>
					</p>
					<p class="c46">
						<xsl:value-of
							select="concat(/ob:obavestenje/ob:informacije_o_obavestenju/ob:organ/common:adresa/common:ulica, ' ')"></xsl:value-of>
						<xsl:value-of
							select="/ob:obavestenje/ob:informacije_o_obavestenju/ob:organ/common:adresa/common:broj"></xsl:value-of>
						<xsl:text>,</xsl:text>
						<xsl:value-of
							select="/ob:obavestenje/ob:informacije_o_obavestenju/ob:organ/common:adresa/common:mesto"></xsl:value-of>
					</p>
					<p class="c46">(назив и седиште органа)</p>
					<p class="c40">
						Број предмета:
						<xsl:value-of select="/ob:obavestenje/@broj_zahteva"></xsl:value-of>
					</p>
					<p class="c40">
						Датум:
						<span class="c41">
							<tab1>
								<xsl:value-of
									select="/ob:obavestenje/ob:informacije_o_obavestenju/ob:datum_obavestenja"></xsl:value-of>
							</tab1>
						</span>
					</p>
					<p class="c45">
						<xsl:value-of
							select="/ob:obavestenje/ob:informacije_o_obavestenju/ob:trazilac/common:naziv"></xsl:value-of>
						<xsl:value-of
							select="concat(/ob:obavestenje/ob:informacije_o_obavestenju/ob:trazilac/common:ime, ' ')"></xsl:value-of>
						<xsl:value-of
							select="/ob:obavestenje/ob:informacije_o_obavestenju/ob:trazilac/common:prezime"></xsl:value-of>
					</p>
					<p class="c46">
						<xsl:value-of
							select="concat(/ob:obavestenje/ob:informacije_o_obavestenju/ob:trazilac/common:adresa/common:ulica, ' ')"></xsl:value-of>
						<xsl:value-of
							select="/ob:obavestenje/ob:informacije_o_obavestenju/ob:trazilac/common:adresa/common:broj"></xsl:value-of>
						<xsl:text>,</xsl:text>
						<xsl:value-of
							select="/ob:obavestenje/ob:informacije_o_obavestenju/ob:trazilac/common:adresa/common:mesto"></xsl:value-of>
					</p>
					<p class="c46">Име и презиме / назив / и адреса подносиоца захтева</p>
					<br />
					<p class="c6">
						<strong>О Б А В Е Ш Т Е Њ Е</strong>
					</p>
					<xsl:if
						test="/ob:obavestenje/ob:odgovor_na_zahtev/ob:zahtevi/ob:informacije_o_uvidu">
						<p class="c37">
							<strong>
								о стављању на увид документа
							</strong>
						</p>
					</xsl:if>
					<xsl:if
						test="/ob:obavestenje/ob:odgovor_na_zahtev/ob:zahtevi/ob:informacije_o_posedovanju">
						<p class="c37">
							<strong>
								о поседовању документа
							</strong>
						</p>
					</xsl:if>
					<xsl:if
						test="/ob:obavestenje/ob:odgovor_na_zahtev/ob:zahtevi/ob:informacije_o_izradi_kopije">
						<p class="c37">
							<strong>
								о изради копије
							</strong>
						</p>
					</xsl:if>
					<xsl:if
						test="/ob:obavestenje/ob:odgovor_na_zahtev/ob:zahtevi/ob:informacije_o_dostavljanju_dokumenta">
						<p class="c37">
							<strong>
								о достављању документа
							</strong>
						</p>
					</xsl:if>
					<p class="c39">
						<span>
							<tab1>
								На основу члана 16. ст. 1. Закона о слободном приступу
								информацијама од јавног значаја, поступајући по вашем захтеву за
								слободан приступ информацијама од
								<u>
									<xsl:value-of
										select="/ob:obavestenje/ob:zahtev/ob:datum_trazenja_informacija"></xsl:value-of>
								</u>
								год., којим сте тражили увид у документ/е са информацијама о / у
								вези са:
							</tab1>
						</span>
					</p>
					<p class="c42">
						<xsl:value-of
							select="/ob:obavestenje/ob:zahtev/ob:opis_trazene_informacije"></xsl:value-of>
					</p>
					<p class="c43">(опис тражене информације)</p>
					<xsl:if
						test="/ob:obavestenje/ob:odgovor_na_zahtev/ob:zahtevi/ob:informacije_o_uvidu">
						<xsl:choose>
							<xsl:when
								test="contains(/ob:obavestenje/ob:odgovor_na_zahtev/ob:zahtevi/ob:informacije_o_uvidu/@status,'true')">
								<p class="c39">
									<tab1>
										Oбавештавамо вас да дана
										<u>
											<xsl:value-of
												select="/ob:obavestenje/ob:odgovor_na_zahtev/ob:zahtevi/ob:informacije_o_uvidu/ob:datum_uvida"></xsl:value-of>
										</u>
										,
										у
										<xsl:choose>
											<xsl:when
												test="/ob:obavestenje/ob:odgovor_na_zahtev/ob:zahtevi/ob:informacije_o_uvidu/ob:vreme_uvida/ob:tacno_vreme_uvida">
												<u>
													<xsl:value-of
														select="/ob:obavestenje/ob:odgovor_na_zahtev/ob:zahtevi/ob:informacije_o_uvidu/ob:vreme_uvida/ob:tacno_vreme_uvida"></xsl:value-of>
												</u>
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
												<u>
													<xsl:value-of
														select="/ob:obavestenje/ob:odgovor_na_zahtev/ob:zahtevi/ob:informacije_o_uvidu/ob:vreme_uvida/ob:interval_uvida/ob:od"></xsl:value-of>
												</u>
												до
												<u>
													<xsl:value-of
														select="/ob:obavestenje/ob:odgovor_na_zahtev/ob:zahtevi/ob:informacije_o_uvidu/ob:vreme_uvida/ob:interval_uvida/ob:do"></xsl:value-of>
												</u>
											</xsl:when>
											<xsl:otherwise>
												од / до /
											</xsl:otherwise>
										</xsl:choose>
										часова, у просторијама органа у
										<u>
											<xsl:value-of
												select="/ob:obavestenje/ob:odgovor_na_zahtev/ob:zahtevi/ob:informacije_o_uvidu/ob:mesto_uvida/common:mesto"></xsl:value-of>
										</u>
										ул.
										<u>
											<xsl:value-of
												select="/ob:obavestenje/ob:odgovor_na_zahtev/ob:zahtevi/ob:informacije_o_uvidu/ob:mesto_uvida/common:ulica"></xsl:value-of>
										</u>
										бр.
										<u>
											<xsl:value-of
												select="/ob:obavestenje/ob:odgovor_na_zahtev/ob:zahtevi/ob:informacije_o_uvidu/ob:mesto_uvida/common:broj"></xsl:value-of>
										</u>
										,
										канцеларија бр.
										<u>
											<xsl:value-of
												select="/ob:obavestenje/ob:odgovor_na_zahtev/ob:zahtevi/ob:informacije_o_uvidu/ob:mesto_uvida/ob:kancelarija"></xsl:value-of>
										</u>
										можете
										<b>извршити увид</b>
										у документ/е у коме је садржана тражена
										информација.
									</tab1>
								</p>
							</xsl:when>
							<xsl:otherwise>
								<p class="c39">
									<tab1>
										Обавештавамо вас да ваш захтев за увид у документ/е у
										коме је
										садржана
										тражена информација
										<b>није прихваћен</b>
										.
									</tab1>
								</p>
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
										<p class="c39">
											<tab1>
												Овом приликом вас обавештавамо да
												<b>поседујемо</b>
												информације које
												сте навели у захтеву.
											</tab1>
										</p>
									</xsl:when>
									<xsl:otherwise>
										<p class="c39">
											<tab1>
												Нажалост,
												<b>не поседујемо</b>
												информације које сте навели у
												захтеву.
											</tab1>
										</p>
									</xsl:otherwise>
								</xsl:choose>
							</xsl:when>
							<xsl:otherwise>
								<p class="c39">
									<tab1>
										Нажалост,
										<b>не можемо вам рећи</b>
										да ли поседујемо информације
										које сте
										тражили у захтеву.
									</tab1>
								</p>
							</xsl:otherwise>
						</xsl:choose>
					</xsl:if>
					<xsl:if
						test="/ob:obavestenje/ob:odgovor_na_zahtev/ob:zahtevi/ob:informacije_o_uvidu">
						<xsl:choose>
							<xsl:when
								test="contains(/ob:obavestenje/ob:odgovor_na_zahtev/ob:zahtevi/ob:informacije_o_izradi_kopije/@status,'true')">
								<p class="c39">
									<tab1>
										Обавештавамо вас да је ваш захтев за издавњем копије
										документа/ата у коме
										је садржана тражена информација
										<b>прихваћен</b>
										.
									</tab1>
								</p>
							</xsl:when>
							<xsl:otherwise>
								<p class="c39">
									<tab1>
										Обавештавамо вас да ваш захтев за издавњем копије
										документа/ата у коме је
										садржана тражена информација
										<b>није
											прихваћен</b>
										.
									</tab1>
								</p>
							</xsl:otherwise>
						</xsl:choose>
					</xsl:if>
					<xsl:if
						test="/ob:obavestenje/ob:odgovor_na_zahtev/ob:zahtevi/ob:informacije_o_uvidu">
						<xsl:choose>
							<xsl:when
								test="contains(/ob:obavestenje/ob:odgovor_na_zahtev/ob:zahtevi/ob:informacije_o_dostavljanju_dokumenta/@status,'true')">
								<p class="c39">
									<tab1>
										Обавештавамо вас да је ваш захтев за достављање
										документа/ата у
										коме је
										садржана тражена информација
										<b>прихваћен</b>
										.
									</tab1>
								</p>
							</xsl:when>
							<xsl:otherwise>
								<p class="c39">
									<tab1>
										Обавештавамо вас да ваш захтев за достављање
										документа/ата у
										коме је
										садржана тражена информација
										<b>није
											прихваћен</b>
										.
									</tab1>
								</p>
							</xsl:otherwise>
						</xsl:choose>
					</xsl:if>
					<xsl:if
						test="/ob:obavestenje/ob:odgovor_na_zahtev/ob:uplata_troskova">
						<p class="c39">
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
						</p>
						<p class="c39">
							<tab1>
								Износ укупних трошкова износи
								<u>
									<xsl:value-of
										select="/ob:obavestenje/ob:odgovor_na_zahtev/ob:uplata_troskova/ob:uplatnica/ob:iznos"></xsl:value-of>
								</u>
								динара
								и уплаћује се на жиро-рачун
								<u>
									<xsl:value-of
										select="/ob:obavestenje/ob:odgovor_na_zahtev/ob:uplata_troskova/ob:uplatnica/ob:primalac"></xsl:value-of>
								</u>
								бр.
								<u>
									<xsl:value-of
										select="/ob:obavestenje/ob:odgovor_na_zahtev/ob:uplata_troskova/ob:uplatnica/ob:racun"></xsl:value-of>
								</u>
								, с позивом на број
								<u>
									<xsl:value-of
										select="/ob:obavestenje/ob:odgovor_na_zahtev/ob:uplata_troskova/ob:uplatnica/ob:poziv_na_broj"></xsl:value-of>
								</u>
								– ознака шифре општине/града где се налази орган власти
								(из
								Правилника о условима и начину вођења рачуна – „Сл. гласник
								РС“,
								20/07... 40/10).
							</tab1>
						</p>
					</xsl:if>
					<p class="c39">
						Достављено:
					</p>

					<xsl:choose>
						<xsl:when
							test="/ob:obavestenje/ob:dostavljeno/ob:imenovanom and /ob:obavestenje/ob:dostavljeno/ob:arhivi">
							<p class="c40">
								1. Именованом
							</p>
							<p class="c40">
								2. Архиви
							</p>
						</xsl:when>
						<xsl:when
							test="/ob:obavestenje/ob:dostavljeno/ob:imenovanom and not(/ob:obavestenje/ob:dostavljeno/ob:arhivi)">
							<p class="c40">
								1. Именованом
							</p>
						</xsl:when>
						<xsl:when
							test="not(/ob:obavestenje/ob:dostavljeno/ob:imenovanom) and /ob:obavestenje/ob:dostavljeno/ob:arhivi">
							<p class="c40">
								1. Архиви
							</p>
						</xsl:when>
						<xsl:otherwise>
						</xsl:otherwise>
					</xsl:choose>

					<div class="c25">
						<p class="c24">(М.П.)</p>
					</div>
				</div>
			</body>
		</html>
	</xsl:template>
</xsl:stylesheet>