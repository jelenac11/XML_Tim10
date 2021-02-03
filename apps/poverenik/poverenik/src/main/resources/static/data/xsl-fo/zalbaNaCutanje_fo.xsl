<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" 
	 xmlns:fo="http://www.w3.org/1999/XSL/Format"
    xmlns:zc="http://www.projekat.org/zalba_cutanja"
    xmlns:common="http://www.projekat.org/common"
    xmlns:xs="http://www.w3.org/2001/XMLSchema"
    version="2.0">
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
						font-size="10pt" text-align="center" font-weight="bold">
						ЖАЛБА КАДА ОРГАН ВЛАСТИ <fo:inline text-decoration="underline">НИЈЕ ПОСТУПИО/ није поступио у целости/ ПО ЗАХТЕВУ</fo:inline>
					</fo:block>
					<fo:block font-family="Times New Roman" text-align="center"
						font-size="10pt" font-weight="bold">
						ТРАЖИОЦА У ЗАКОНСКОМ  РОКУ  (ЋУТАЊЕ УПРАВЕ)
					</fo:block>
					<fo:block font-family="Times New Roman" text-align="left"
						font-size="12pt" font-weight="bold" margin-top="12pt">
						Поверенику за информације од јавног значаја и заштиту података о личности
					</fo:block>
					<fo:block font-family="Times New Roman" text-align="left"
						font-size="11pt">
						Адреса за пошту: <xsl:value-of select="concat(/zc:zalba_na_cutanje/zc:adresa_poverenika/common:mesto, ', ')"></xsl:value-of>
                    	<xsl:value-of select="/zc:zalba_na_cutanje/zc:adresa_poverenika/common:ulica"></xsl:value-of> бр. <xsl:value-of select="/zc:zalba_na_cutanje/zc:adresa_poverenika/common:broj"></xsl:value-of>
					</fo:block>
					<fo:block font-family="Times New Roman" text-align="left"
						font-size="11pt" margin-top="23pt">
						У складу са чланом 22. Закона о слободном приступу информацијама од јавног значаја подносим:
					</fo:block>
					<fo:block font-family="Times New Roman" text-align="center"
						font-size="11pt" font-weight="bold">
						Ж А Л Б У
					</fo:block>
					<fo:block font-family="Times New Roman" text-align="center"
						font-size="11pt">
						против
					</fo:block>
					<fo:block font-family="Times New Roman" text-align="center"
						font-size="11pt">
						<xsl:value-of select="/zc:zalba_na_cutanje/zc:organ_protiv_kojeg_je_zalba/common:naziv"></xsl:value-of>, <xsl:value-of select="concat(/zc:zalba_na_cutanje/zc:organ_protiv_kojeg_je_zalba/common:adresa/common:ulica, ' ')"></xsl:value-of><xsl:value-of select="/zc:zalba_na_cutanje/zc:organ_protiv_kojeg_je_zalba/common:adresa/common:broj"></xsl:value-of>, <xsl:value-of select="/zc:zalba_na_cutanje/zc:organ_protiv_kojeg_je_zalba/common:adresa/common:mesto"></xsl:value-of>
					</fo:block>
					<fo:block font-family="Times New Roman"
						text-align="center" font-size="11pt" margin-top="13pt">
						( навести назив органа )
					</fo:block>
					<fo:block font-family="Times New Roman"
						text-align="center" font-size="11pt" margin-top="12pt">
						због тога што орган власти:
					</fo:block>
					<xsl:if test='/zc:zalba_na_cutanje/zc:podaci_o_zalbi/zc:razlog_zalbe = "није поступио"'>
                        <fo:block font-family="Times New Roman"
							text-align="center" font-size="11pt" font-weight="bold">
							<fo:inline text-decoration="underline">није поступио</fo:inline>
							<fo:inline>/ није поступио у целости</fo:inline>
							<fo:inline>/ у законском року</fo:inline>
						</fo:block>
                    </xsl:if>
                    <xsl:if test='/zc:zalba_na_cutanje/zc:podaci_o_zalbi/zc:razlog_zalbe = "није поступио у целости"'>
                         <fo:block font-family="Times New Roman"
							text-align="center" font-size="11pt" font-weight="bold">
							<fo:inline>није поступио/ </fo:inline>
							<fo:inline text-decoration="underline">није поступио у целости</fo:inline>
							<fo:inline>/ у законском року</fo:inline>
						</fo:block>
                    </xsl:if>
                    <xsl:if test='/zc:zalba_na_cutanje/zc:podaci_o_zalbi/zc:razlog_zalbe = "није поступио у законском року"'>
                       <fo:block font-family="Times New Roman"
							text-align="center" font-size="11pt" font-weight="bold">
							<fo:inline>није поступио/ </fo:inline>
							<fo:inline>није поступио у целости/ </fo:inline>
							<fo:inline  text-decoration="underline">у законском року</fo:inline>
						</fo:block>
                    </xsl:if>
                     <xsl:if test='/zc:zalba_na_cutanje/zc:podaci_o_zalbi/zc:razlog_zalbe = ""'>
                           <fo:block font-family="Times New Roman"
							text-align="center" font-size="11pt" font-weight="bold">
							<fo:inline>није поступио/ </fo:inline>
							<fo:inline>није поступио у целости/ </fo:inline>
							<fo:inline>у законском року</fo:inline>
						</fo:block>
                     </xsl:if>
					<fo:block font-family="Times New Roman"
						text-align="center" font-size="11pt" >
						(подвући  због чега се изјављује жалба)
					</fo:block>
					<fo:block font-family="Times New Roman"
						text-align="justify" font-size="11pt" margin-top="12pt">
						по мом захтеву за слободан приступ информацијама од јавног значаја који сам поднео том органу дана 
                        <xsl:variable name="datum" select="substring-after(/zc:zalba_na_cutanje/zc:podaci_o_zahtevu/zc:datum, '-')"/>
                        <xsl:value-of select="substring(/zc:zalba_na_cutanje/zc:podaci_o_zahtevu/zc:datum, 9, 9)"></xsl:value-of>.
                        <xsl:value-of select="substring-before($datum, '-')"></xsl:value-of>.
                        <xsl:value-of select="substring-before(/zc:zalba_na_cutanje/zc:podaci_o_zahtevu/zc:datum, '-')"></xsl:value-of>. године, а којим сам тражио/ла да ми се у складу са Законом о слободном приступу информацијама од јавног значаја омогући увид- копија документа који садржи информације о /у вези са:
					</fo:block>
					<fo:block font-family="Times New Roman"
						text-align="justify" font-size="11pt">
						<xsl:value-of select="/zc:zalba_na_cutanje/zc:podaci_o_zahtevu/zc:informacije"></xsl:value-of>
					</fo:block>
					<fo:block font-family="Times New Roman"
						text-align="center" font-size="11pt">
						(навести податке о захтеву и информацији/ама)
					</fo:block>
					<fo:block white-space-treatment="preserve"> </fo:block>
					<fo:block font-family="Times New Roman"
						text-align="justify" text-indent="3em" margin-top="12pt">
						На основу изнетог, предлажем да Повереник уважи моју жалбу и омогући ми приступ траженој/им информацији/ма.
					</fo:block>
					<fo:block font-family="Times New Roman"
						text-align="justify" text-indent="3em">
						Као доказ, уз жалбу достављам копију захтева са доказом о предаји органу власти.
					</fo:block>
					<fo:block font-family="Times New Roman"
						text-align="justify" text-indent="3em">
						<fo:inline font-weight="bold">Напомена: </fo:inline>Код жалбе  због непоступању по захтеву у целости, треба приложити и добијени одговор органа власти.
					</fo:block>
					<fo:block font-family="Times New Roman" font-size="11pt" margin-top="2pt"
						text-align="right">
						<xsl:value-of select="/zc:zalba_na_cutanje/zc:podaci_o_zalbi/zc:podnosilac_zalbe/zc:lice/common:naziv"></xsl:value-of>
						<xsl:value-of select="concat(/zc:zalba_na_cutanje/zc:podaci_o_zalbi/zc:podnosilac_zalbe/zc:lice/common:ime, ' ')"></xsl:value-of>
						<xsl:value-of select="/zc:zalba_na_cutanje/zc:podaci_o_zalbi/zc:podnosilac_zalbe/zc:lice/common:prezime"></xsl:value-of>
					</fo:block>
					<fo:block font-family="Times New Roman" font-size="11pt"
						text-align="right">
						Подносилац жалбе/Име и презиме
					</fo:block>
					<fo:block font-family="Times New Roman" font-size="11pt"
						text-align="right">
						<xsl:value-of select="concat(/zc:zalba_na_cutanje/zc:podaci_o_zalbi/zc:podnosilac_zalbe/zc:lice/common:adresa/common:ulica, ' ')"></xsl:value-of>
						<xsl:value-of select="concat(/zc:zalba_na_cutanje/zc:podaci_o_zalbi/zc:podnosilac_zalbe/zc:lice/common:adresa/common:broj, ', ')"></xsl:value-of>
						<xsl:value-of select="/zc:zalba_na_cutanje/zc:podaci_o_zalbi/zc:podnosilac_zalbe/zc:lice/common:adresa/common:mesto"></xsl:value-of>
					</fo:block>
					<fo:block font-family="Times New Roman" font-size="11pt"
						text-align="right">
						адреса
					</fo:block>
					<fo:block font-family="Times New Roman" font-size="11pt"
						text-align="right">
						<xsl:value-of select="/zc:zalba_na_cutanje/zc:podaci_o_zalbi/zc:podnosilac_zalbe/zc:drugi_podaci_za_kontakt"></xsl:value-of>
					</fo:block>
					<fo:block font-family="Times New Roman" font-size="11pt"
						text-align="right">
						други подаци за контакт
					</fo:block>
					<fo:block font-family="Times New Roman" font-size="11pt" margin-top="12pt"
						text-align="right">
						потпис
					</fo:block>
					<fo:block font-family="Times New Roman" font-size="11pt"
						text-align="left" >
						У
						<xsl:value-of select="/zc:zalba_na_cutanje/zc:podaci_o_zalbi/zc:mesto"></xsl:value-of>, дана 
						<xsl:variable name="currenttime"
							select="/zc:zalba_na_cutanje/zc:podaci_o_zalbi/zc:datum_podnosenja" as="xs:date" />
						<xsl:if
							test="number(format-date($currenttime,'[D]')) gt 9">
							<xsl:value-of
								select="format-date($currenttime,'[D]')" />
						</xsl:if>
						<xsl:if
							test="number(format-date($currenttime,'[D]')) lt 10">
							<xsl:text>0</xsl:text>
							<xsl:value-of
								select="format-date($currenttime,'[D]')" />
						</xsl:if>
						<xsl:text>.</xsl:text>
						<xsl:if
							test="number(format-date($currenttime,'[M]')) gt 9">
							<xsl:value-of
								select="format-date($currenttime,'[M]')" />
						</xsl:if>
						<xsl:if
							test="number(format-date($currenttime,'[M]')) lt 10">
							<xsl:text>0</xsl:text>
							<xsl:value-of
								select="format-date($currenttime,'[M]')" />
						</xsl:if>
						<xsl:text>.</xsl:text>
						<xsl:value-of
							select="format-date($currenttime,'[Y]')" />. године
					</fo:block>
				</fo:flow>
			</fo:page-sequence>
		</fo:root>
	</xsl:template>
</xsl:stylesheet>